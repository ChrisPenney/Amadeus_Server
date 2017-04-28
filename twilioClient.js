var twilio = require('twilio');
var client = new twilio.RestClient();

/*module.exports.sendToAndroid = function (smsSender, smsBody) {
    client.messages.create({
        body: 'Received message from: ' + smsSender + '\nBody: ' + smsBody,
        to: '+16313360360',
        from: '+15165950512'
    }, function (error, message) {
        console.log(message.sid);
    }); 
}*/

var sendTestToAndroid = function () {
    console.log('\nSending test message from Twilio to Android to trigger Amadeus..');
    client.messages.create({
        body: 'Hello, World!',
        to: '+16313360360',
        from: '+15165950512'
    }, function (error, message) {
        ///console.log(message.sid);
    });
};

var sendTextToTwilio = function (message) {
    console.log('\nSending text message from Slack to Twilio..');
    client.messages.create({
        body: message,
        to: '+16313360360',
        from: '+15165950512'
    }, function (error, msg) {
        //console.log(msg.id);
    });
};

module.exports = {
  sendTextToTwilio: sendTextToTwilio,
  sendTestToAndroid: sendTestToAndroid  
};