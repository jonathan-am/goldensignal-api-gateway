const { default: axios } = require("axios");

module.exports = async function requestPlataformList(req, res) {
    await axios.get(`http://localhost:5555/plataform/list/${req.params.affiliateId}`).then(async (response)=> {
        const plataformList = response.data;
        await res.status(200).send(plataformList);
    }).catch(error=> {
        console.log(error);
        res.status(error.response.status).send(error.response.data);
    })
}