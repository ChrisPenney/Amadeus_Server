var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var twilioClient = require('./twilioClient');
var app = express();



twilioClient.sendSms();

app.listen(8000, function() {
    console.log('Amadeus server listening on :8000');
});