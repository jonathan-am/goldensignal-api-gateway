const axios = require("axios");

module.exports = async function requestCurrentDemoGame(req, res) {
    await axios.get(`http://localhost:5555/game/list/${req.headers.affiliateid}`).then(async response1 => {
        let gameList = response1.data;
        for (let i = 0; i < gameList.length; i++) {
            if (gameList[i].game_id == req.params.game_id.toString().split("@")[0]) {
                try {
                    for (let x = 0; x < gameList[i].gameLinks.length; x++) {
                        if (gameList[i].gameLinks[x].plataform === "pg_game_id") {
                            const pgid = gameList[i].gameLinks[x].redirectUrl;
                            await axios.post('https://go51.vip/api/platform/frontend/game-demo/launch', { "platformId": 24, "kind": 5, "gameCode": pgid, "lang": "br", "currency": "BRL" }).then(async (response) => {
                                await res.status(200).send({ "game_url": response.data.data });
                            });
                        }
                    }
                } catch (error) {
                    await res.status(500).send("error: " + error);
                }
            }
        }
    });
};