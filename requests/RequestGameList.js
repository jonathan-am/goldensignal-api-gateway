const { default: axios } = require('axios');

module.exports = async function requestGameList(req, res) {
    await axios.get(`http://localhost:5555/game/list/${req.params.affiliateId}`).then(async (response)=> {

        let gameList = response.data;

        gameList.map((v)=> {
            v.percentage=getRandomInt(44, 85);
        });
    
        await res.status(200).send(gameList);
    }).catch(error => {
        console.log(error);
        res.status(error.response.status).send(error.response.data);
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }