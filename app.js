var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var twilioClient = require('./twilioClient');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
twilioClient.testToAndroid();

router.post('/twilio', function(req, res) {
    var jsonSmsInfo = req.body;
    var jsonSmsBody = JSON.parse('"' + jsonSmsInfo.Body + '"');
    transformMessageFromAndroid(jsonSmsBody);
    res.send(400);
});

function transformMessageFromAndroid(bareSms) {
    var messageSender = bareSms.phoneNumber;
    var messageBody = bareSms.body;
    var messageForSlack = "Received message from: " + messageSender + "\nBody: " + messageBody;
    console.log(messageForSlack);
}

app.use(router);
//twilioClient.create();

app.listen(5000, function() {
    console.log('Amadeus server listening on :8000');
});