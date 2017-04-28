var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var twilioClient = require('./twilioClient');
var app = express();
var router = express.Router();
var WebClient = require('@slack/client').WebClient;
var slackToken = process.env.SLACK_API_TOKEN;
var web = new WebClient(slackToken);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var msgObj = {
        "as_user": true
};
web.chat.postMessage('D3WUWGPM0', 'hey', msgObj, function(err, res) {
    if (err) console.log(err);
    else console.log('Message sent to Slack: ' + res);
});

//twilioClient.testToAndroid();

router.post('/twilio', function(req, res) {
    var jsonSmsInfo = req.body;
    var jsonSmsBody = JSON.parse(jsonSmsInfo.Body);
    transformMessageFromAndroid(jsonSmsBody);
    res.sendStatus(200);
});

function transformMessageFromAndroid(jsonSms) {
    var messageSender = jsonSms.phoneNumber;
    var messageBody = jsonSms.body;
    var messageForSlack = "Received message from: " + messageSender + "\nBody: " + messageBody;
    console.log(messageForSlack);
}

app.use(router);

app.listen(5000, function() {
    console.log('Amadeus server listening on :5000');
});