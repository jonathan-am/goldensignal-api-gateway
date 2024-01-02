const { default: axios } = require("axios")

module.exports = async function requestCurrentGame(req, res) {
    axios.get('http://localhost:5555/game/current', {headers: {affiliateid: req.headers.affiliateid, gameid: req.params.game_id, plataformid: req.headers.plataformid}}).then(response=> {
        res.status(200).send(response.data);
    }).catch(error=> {
        res.status(500).send({status: "500", error: "Error while getting current game"});
    })
}