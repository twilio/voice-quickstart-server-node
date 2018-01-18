require('dotenv').load();

const http = require('http');
const path = require('path');
const express = require('express');
var methods = require('./src/server.js');
const tokenGenerator = methods.tokenGenerator;
const makeCall = methods.makeCall;
const placeCall = methods.placeCall;
const incomingCall = methods.incomingCall;
var twilio = require('twilio');

// Create Express webapp
const app = express();

app.get('/accessToken', function(request, response) {
  const identity = request.query.identity || 'identity';
  response.send(tokenGenerator(identity));
});

app.get('/makeCall', function(request, response) {
  const to = request.query.to;
  response.send(makeCall(to));
});

app.get('/placeCall', function(request, response) {
  const to = request.query.to;
  response.send(placeCall(to, request));
});

app.post('/incomingCall', function(request, response) {
  const to = request.query.to;
  response.send(incomingCall());
});

// Create an http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Express server running on *:' + port);
});
