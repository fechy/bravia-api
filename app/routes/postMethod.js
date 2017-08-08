const config = require('../config/tv.json');
const TV = require('../models/tv');
const cleanQuery = require('../models/helpers').cleanQuery;

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    const postData = cleanQuery(req);
    const protocol = req.params.protocol || 'system';
    const version  = req.params.version || '1.0';

    tv.post(req.params.id, postData, version, protocol)
        .then((result) => {
            res.json({ result: !result, request: postData });
        })
        .catch((error) => {
            console.log({ error, request: postData });
            res.json({
                error: error.message
            });
        });
};