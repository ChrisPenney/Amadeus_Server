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

module.exports.testToAndroid = function () {
    client.messages.create({
        body: 'Hello, World!',
        to: '+16313360360',
        from: '+15165950512'
    }, function (error, message) {
        ///console.log(message.sid);
    }); 
}