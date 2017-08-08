const config = require('../config/tv.json');
const TV = require('../models/tv');

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    tv.getIRCCCodes().then((response) => {
        res.json({ response });
    }).catch((err) => {
        console.error(err);
        res.json({error: err.message});
    })
};