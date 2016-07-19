require('newrelic');
var express = require('express');
var app = express();
var request = require('request');
var raven = require('raven');
var config=require('./config');
var client = new raven.Client(config.sentry);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/images/', function (req, res) {
  request('http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC', function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.send(body)
       }
  });
});


app.get('/error/', function (req, res) {

  try {
    adddpe('a');
  } catch (e) {
    client.captureException(e);
    res.send('Error');
  }
});



app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
