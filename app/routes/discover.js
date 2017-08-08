const Bravia = require('bravia');

// The time in milliseconds for the bravia discovery to scan for.
let timeout = 5000;

module.exports = function (req, res) {

    // Attempts to discover any Sony Bravia TVs.
    Bravia.discover(timeout)
        .then(devices => {
            res.json({ devices });
        })
        .catch(error => {
            console.log(error);
            res.json({ error })
        });
};