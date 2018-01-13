require('dotenv').load();

const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const VoiceResponse = require('twilio').twiml.VoiceResponse;

function tokenGenerator(identity) {
  // Used when generating any kind of tokens
  const accountSid = process.env.ACCOUNT_SID;
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_KEY_SECRET;

  // Used specifically for creating Voice tokens
  const pushCredSid = process.env.PUSH_CREDENTIAL_SID;
  const outgoingApplicationSid = process.env.APP_SID;

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: outgoingApplicationSid,
      pushCredentialSid: pushCredSid
    });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(accountSid, apiKey, apiSecret);
  token.addGrant(voiceGrant);
  token.identity = identity;

  // Serialize the token to a JWT string
  return token.toJwt();
}

function makeCall(to) {
  // Use a valid Twilio number by adding to your account via https://www.twilio.com/console/phone-numbers/verified
  defaultCallerId = "1234567890";
  callerId = 'client:quick_start'
  identity = `alice`
  phoneNumberChars = "+1234567890";
  const response = new VoiceResponse();
  const dial = response.dial();

  if (!to) {
      response.say("Congratulations! You have made your first call! Good bye.");
  } else if (phoneNumberChars.indexOf(to[0]) != -1) {
      dial.number({callerId : defaultCallerId}, to);
  } else {
      dial.client({callerId : callerId}, to);
  }

  // Serialize the twiml to string
  return response.toString();
}

function placeCall(to, request) {
  callerId = 'client:quick_start'
  var url = request.protocol + '://' + request.get('host') + '/incomingCall';
  console.log(url)
  const accountSid = process.env.ACCOUNT_SID;
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_KEY_SECRET;
  const client = require('twilio')(apiKey, apiSecret, { accountSid: accountSid } );

  call = client.api.calls.create({
    url: url,
    to: 'client:' + to,
    from: callerId,
  })
  .then((call) => console.log(call.sid));

  return call.sid;
}

function incomingCall() {
  const response = new VoiceResponse();
  response.say("Congratulations! You have received your first inbound call! Good bye.");
  // Serialize the twiml to string
  return response.toString();
}

exports.tokenGenerator = tokenGenerator;
exports.makeCall = makeCall;
exports.placeCall = placeCall;
exports.incomingCall = incomingCall;
