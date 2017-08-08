const config = require('../config/tv.json');
const TV = require('../models/tv');

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    tv.send(req.params.command)
        .then((result) => {
            res.json({ result: result === undefined ? true : result });
        })
        .catch((error) => {
            console.error(error);
            res.json({ error: error.message });
        });
};