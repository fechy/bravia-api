const config = require('../config/tv.json');
const TV = require('../models/tv');

module.exports = (req, res) => {

    const tv = TV(config.ip, config.port, config.psk);

    tv.methodTypes(null, 'system').then(methods => {
        const response = { system: methods };

        tv.methodTypes(null, 'audio').then(methods => {
            response.audio = methods;
            res.json({response});
        })
        .catch(error => {
            console.error(error);
            res.json({ error: error.message });
        });
    })
    .catch(error => {
        console.error(error);
        res.json({ error: error.message });
    });
};