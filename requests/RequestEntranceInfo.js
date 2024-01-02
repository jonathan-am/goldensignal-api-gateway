module.exports = async function requestEntranceInfo(req, res) {
    await res.status(200).send({
        pgj: getRandomInt(40, 84)+"%",
        minute: getRandomInt(1, 9),
        rounds: getRandomInt(7, 12),
        mode: getMode()
    });
}

function getMode() {
    return getRandomInt(10, 20) > 10 ? "normal" : "turbo";
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }