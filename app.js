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


twilioClient.sendTestToAndroid();

router.post('/twilio', function (req, res) {
    // make sure to change Receiving SMS URL on Twilio
    console.log('\nSuccessfully received SMS on Twilio endpoint from Android!');
    var jsonSmsInformation = req.body;
    var jsonSmsBody = JSON.parse(jsonSmsInformation.Body);
    parseMessageSentFromAndroidReceivedOnTwilioEndpoint(jsonSmsBody);
    res.sendStatus(200);
});

function parseMessageSentFromAndroidReceivedOnTwilioEndpoint(jsonSms) {
    var messageSender = jsonSms.phoneNumber;
    var messageBody = jsonSms.body;

    prepareAndSendMessageFromTwilioToSlack(messageSender, messageBody);
}

function prepareAndSendMessageFromTwilioToSlack(originalSender, originalBody) {
    var messageForSlack = '{"phoneNumber": "' + '+1'+ originalSender + '","body": "' + originalBody + '"}';
    var msgProperties = {
        
    };

    web.chat.postMessage('#text-channel', messageForSlack, msgProperties, function (err, res) {
        if (err) console.log(err);
        else console.log('Message is now being sent to Slack::\n"' + res.message.text + '"\n');
    });
}

router.post('/slack', function(req, res) {
    // make sure to change Outgoing Webhook URL on Slack
    console.log('\nSuccessfully received message on Slack endpoint from #text-channel on Slack!');
    if (req.body.token === '9Zhv8QmAk8vPw1uYolc11PZR') {
        var message = req.body.text;
        console.log('Message is now being sent to Twilio:: \n"' + message + '"');  

        prepareAndSendMessageFromSlackToTwilio(message);
    }
});

function prepareAndSendMessageFromSlackToTwilio(message) {
    twilioClient.sendTextToTwilio(message);
}

app.use(router);

app.listen(5000, function () {
    console.log('Amadeus server listening on port 5000');
});