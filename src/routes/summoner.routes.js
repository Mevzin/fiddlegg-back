const { Router } = require("express");
const SummonerService = require("../service/Summoner.service")

const summonerRouter = Router();

summonerRouter.get('/searchUser/:summonerNick/:locale', async (req, res) => {
    const { summonerNick,locale } = req.params;
    return res.json(await SummonerService.getByNickname(summonerNick, locale));
});

summonerRouter.get('/matchs/:puuId', async (req, res) => {
    const { puuId } = req.params;
    return res.json(await SummonerService.getMatchsBySummonerID(puuId));
});

summonerRouter.get('/rank/:idUser', async (req, res) => {
    const { idUser } = req.params;
    return res.json(await SummonerService.getSummonerRankByRankID(idUser));
});

module.exports = summonerRouter;