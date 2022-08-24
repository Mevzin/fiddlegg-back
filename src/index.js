const express = require("express");
const { json } = require("express");
require("dotenv").config();

const cors = require("cors");

//ROTAS
const summonerRouter = require("./routes/summoner.routes");

const app = express();

app.use(json());
app.use(cors());
app.listen(process.env.PORT || 3333);

//ROTAS
app.use('/summoner', summonerRouter);
app.use('/', (req, res) => {
  res.send("<h3>Bem vido a fiddle gg api!</h3>")
})

module.exports = app;


