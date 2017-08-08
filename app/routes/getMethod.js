const config = require('../config/tv.json');
const TV = require('../models/tv');

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    // getPowerStatus
    tv.invoke(req.params.id, (response) => res.json(response), (err) => {
        console.error(err);
        res.json({ error: err.message });
    });
};