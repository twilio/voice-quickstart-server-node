Programmable Voice: Quickstart Application Server - Node
===
This repository contains the server-side web application required to run the [Twilio Programmable Voice iOS SDK Quickstart](https://www.twilio.com/docs/api/voice-sdk/ios/getting-started) and [Android SDK Quickstart](https://www.twilio.com/docs/api/voice-sdk/android/getting-started) mobile sample apps.

Looking for the Quickstart mobile app?

Download the client-side Quickstart Applications in Swift and iOS here:

- [Swift Quickstart Mobile App](https://github.com/twilio/voice-quickstart-swift)
- [Objective-C Quickstart Mobile App](https://github.com/twilio/voice-quickstart-objc)

Download the client-side Quickstart Application for Android here:

- [Android Quickstart Mobile App](https://github.com/twilio/voice-quickstart-android)

Prerequisites
---

* A Twilio Account. Don't have one? [Sign up](https://www.twilio.com/try-twilio) for free!
* Follow the [iOS full quickstart tutorial here](https://www.twilio.com/docs/api/voice-sdk/ios/getting-started) or [Android full quickstart tutorial here](https://www.twilio.com/docs/api/voice-sdk/android/getting-started).

## Setting up the Application

Create a configuration file for your application:

```bash
cp .env.example .env
```

Edit `.env` with the three configuration parameters we gathered from above.

Next, we need to install our dependencies from npm:

```bash
npm install
```

Now we should be all set! Run the application using the `node` command.

```bash
node .
```

Visit [http://localhost:3000](http://localhost:3000) to ensure the server is running.

### Up and running

This web application needs to be accessbile on the public internet in order to receive webhook requests from Twilio. [Ngrok](https://ngrok.com/) is a great options for getting this done quickly.

Once you have the application running locally, in a separate terminal window, make your server available to the public internet with the following:

```bash
    ngrok http 3000
```

You should see a dynamically generated public Ngrok URL in the command window. Ngrok will now tunnel all HTTP traffic directed at this URL to your local machine at port 3000.

### Test the app

Test your app by opening the `{YOUR_SERVER_URL}/accessToken` endpoint in your browser. Use the publicly accessible domain on ngrok. You should see a long string. This is an Access Token. You can examine its contents by pasting it into a JWT tool like [jwt.io](http://jwt.io).

## License

MIT
