const config = require('../config/tv.json');
const TV = require('../models/tv');

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    tv.methodTypes().then(methods => {
        res.json({ methods });
    })
    .catch(error => {
        console.error(error);
        res.json({ error: error.message });
    });
};