const { default: axios } = require("axios");

module.exports = async function requestPageConfiguration(req, res) {
    await axios.get(`http://localhost:5555/panel/configuration`, { headers: { "affiliateid": req.headers.affiliateid, "Content-Type": "application/json"}}).then(async (response)=> {
        res.status(200).send(response.data);
    }).catch(error=> {
        console.log(error);
        res.status(error.response.status).send(error.response.data);
    })
}