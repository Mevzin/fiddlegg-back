const axios = require("axios");

exports.getByNickname = async (summonerNick, locale) => {
    var info;
    await axios.get(
        `${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${encodeURI(
            summonerNick
        )}`,
        { headers: { "X-Riot-Token": process.env.LOL_KEY } }
    ).then(summonerData => {
        const { id, puuid, profileIconId, summonerLevel, name } = summonerData.data;
        info = {
            id,
            puuid,
            name,
            summonerLevel,
            iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
            locale
        }
    }).catch((e) => {
        return res.status(e.response.status).json(e.response.data);
    });
    return info;
}

exports.getMatchsBySummonerID = async (summonerID) => {
    const resultMatch = [];
    var i = 0;

    const matchHistoryData = await axios
        .get(`${process.env.LOL_MATCH}/lol/match/v5/matches/by-puuid/${encodeURI(summonerID)}/ids?start=0&count=5`, {
            headers: { "X-Riot-Token": process.env.LOL_KEY },
        }).catch((e) => {
            return res.status(e.response.status).json(e.response.data);
        });

    while (i <= 4) {
        await axios
            .get(`${process.env.LOL_MATCH}/lol/match/v5/matches/${matchHistoryData.data[i]}`, {
                headers: { "X-Riot-Token": process.env.LOL_KEY },
            })
            .then(res => {
                resultMatch.push(res.data);
            })
            .catch((e) => {
                return res.status(e.response.status).json(e.response.data);
            });
        i++
    }
    return resultMatch;
}

exports.getSummonerRankByRankID = async (rankID) => {
    const rankInfo = await axios
        .get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${rankID}`, {
            headers: { "X-Riot-Token": process.env.LOL_KEY },
        }).catch((e) => {
            return res.status(e.response.status).json(e.response.data);
        });

    return rankInfo.data;

}