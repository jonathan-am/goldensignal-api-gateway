const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();
var options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/certificate.crt'),
};
const bodyParser = require('body-parser');
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(cors());

const requestEntranceInfo = require('./requests/RequestEntranceInfo');
const requestCurrentGame = require('./requests/RequestCurrentGame');
const requestGameList = require('./requests/RequestGameList');
const requestCurrentDemoGame = require('./requests/RequestCurrentDemoGame');
const RequestPlataformList = require('./requests/RequestPlataformList');
const RequestPageConfiguration = require('./requests/RequestPageConfiguration');
const RequestCreateUser = require('./requests/RequestCreateUser');

app.get('/v1/configuration', async (req, res)=> {
    try {
        await RequestPageConfiguration(req, res);
    }catch(error) {
        console.log(error);
    }
});

app.get('/v1/game/:game_id', async (req, res)=> {
    try {
        if(req.params.game_id.indexOf("@demo") > -1) {
            await requestCurrentDemoGame(req, res);
        }else {
            await requestCurrentGame(req, res);
        }
    }catch(error) {
        console.log(error);
        res.status(400).send({"status": 400, "message": "bad request"})
    }
});

app.get('/v1/games/:affiliateId', async (req, res)=> {
    await requestGameList(req, res);
});

app.get('/v1/plataforms/:affiliateId', async (req, res)=> {
    await RequestPlataformList(req, res);
});

app.get('/v1/verify', async (req, res)=> {
    await requestEntranceInfo(req, res);
});

var server = https.createServer(options, app).listen(2203, function () {
    console.log("Express https server listening on port " + 2203);
});
app.listen(2204, ()=> { console.log('Listening http into port 2204')});