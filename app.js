var http = require('http'),
  fs = require('fs'),
  express = require('express'),
  bodyParser = require('body-parser'),
  controller = require("./controller.js");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });

  app.options('/*', (req, res) => {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });

router.get('/index', controller.getIndex);
router.post('/result', controller.processRequest);

app.use('/', router);

module.exports = app;
