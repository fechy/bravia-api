const config = require('../config/tv.json');
const TV = require('../models/tv');

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    const postData = (req.body ? req.body : req.query);

    res.json({ result: postData });

    tv.post(req.params.command, postData, '1.0')
        .then((result) => {
            res.json({ result: result === undefined ? true : result });
        })
        .catch((error) => {
            console.error(error);
            res.json({ error: error.message });
        });
};