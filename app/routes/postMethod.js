const config = require('../config/tv.json');
const TV = require('../models/tv');

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    const postData = (Object.keys(req.body).length > 0 ? req.body : req.query);

    Object.keys(postData).map(key => {
        if (postData[key] === 'true' || postData[key] === 'false') {
            postData[key] = postData[key] === 'true';
        } else {
            postData[key] = postData[key];
        }
    });

    tv.post(req.params.command, postData, '1.0')
        .then((result) => {
            res.json({ result: result === undefined ? true : result, request: postData });
        })
        .catch((error) => {
            console.log({ error, request: postData });
            res.json({
                error: error.message
            });
        });
};