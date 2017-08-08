// server.js

// BASE SETUP
// =============================================================================
require("babel-register");
require("babel-polyfill");

// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

const DISCOVER = require('./app/routes/discover');
const CONNECT = require('./app/routes/connect');
const COMMANDS = require('./app/routes/commands');
const SEND_COMMAND = require('./app/routes/sendCommand');
const GET_METHOD = require('./app/routes/getMethod');
const POST_METHOD = require('./app/routes/postMethod');

router.get('/discover', DISCOVER);
router.get('/connect', CONNECT);
router.get('/commands', COMMANDS);

router.get('/command/send/:command', SEND_COMMAND);
router.get('/command/send/:command/:protocol', SEND_COMMAND);

router.post('/command/method/:id', POST_METHOD);
router.post('/command/method/:id/:protocol', POST_METHOD);
router.post('/command/method/:id/:protocol/:version', POST_METHOD);

router.get('/command/method/:id', GET_METHOD);
router.get('/command/method/:id/:protocol', GET_METHOD);
router.get('/command/method/:id/:protocol/:version', GET_METHOD);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Listening to port: ${port}`);