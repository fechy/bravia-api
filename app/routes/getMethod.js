const config = require('../config/tv.json');
const TV = require('../models/tv');
const cleanQuery = require('../models/helpers').cleanQuery;

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    const postData = cleanQuery(req);
    const protocol = req.params.protocol || 'system';
    const version  = req.params.version || '1.0';

    tv.invoke(req.params.id, (response) => res.json(response), (err) => {
        console.error(err);
        res.json({ error: err.message });
    }, protocol, postData, version);
};