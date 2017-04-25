var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports.sendSms = function(to, message) {
    client.messages.create({
        body: "Hey",
        to: "+16313360360",
        from: '+15165950512' 
    }, function( err, data) {
        if (err) console.error(err);
        else {
            console.log('Message sent!');
        }
    });
};