require('dotenv').load();

const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const identity = 'alice';
const callerId = 'client:quick_start';
// Use a valid Twilio number by adding to your account via https://www.twilio.com/console/phone-numbers/verified
const callerNumber = '1234567890';

/**
 * Creates an access token with VoiceGrant using your Twilio credentials.
 *
 * @param {string} identity - The identity
 * @returns {string} - The Access Token string
 */
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
  return token.toJwt();
}

/**
 * Creates an endpoint that can be used in your TwiML App as the Voice Request Url.
 * <br><br>
 * In order to make an outgoing call using Twilio Voice SDK, you need to provide a
 * TwiML App SID in the Access Token. You can run your server, make it publicly
 * accessible and use `/makeCall` endpoint as the Voice Request Url in your TwiML App.
 * <br><br>
 *
 * @param {string} to - The recipient of the call, a phone number or a client
 * @returns {string} - The TwiMl used to respond to an outgoing call
 */
function makeCall(to) {
  const phoneNumberChars = '+1234567890';
  const response = new VoiceResponse();

  if (!to) {
      response.say("Congratulations! You have made your first call! Good bye.");
  } else if (phoneNumberChars.indexOf(to[0]) != -1) {
      const dial = response.dial();
      dial.number({callerId : callerNumber}, to);
  } else {
      const dial = response.dial();
      dial.client({callerId : callerId}, to);
  }
  return response.toString();
}

/**
 * Makes a call to the specified client using the Twilio REST API.
 *
 * @param {string} to - The recipient of the call, a client.
 * @returns {string} - The CallSid
 */
function placeCall(to, request) {
  // The fully qualified URL that should be consulted by Twilio when the call connects.
  var url = request.protocol + '://' + request.get('host') + '/incomingCall';
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

/**
 * Creates an endpoint that plays back a greeting.
 */
function incomingCall() {
  const response = new VoiceResponse();
  response.say("Congratulations! You have received your first inbound call! Good bye.");
  return response.toString();
}

exports.tokenGenerator = tokenGenerator;
exports.makeCall = makeCall;
exports.placeCall = placeCall;
exports.incomingCall = incomingCall;
