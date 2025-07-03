# fb-client-nodejs

**Lightweight Node.js client library for Facebook Messenger**

---

## Features

- Send text messages to users or groups  
- Send images, videos, and files via Facebook Messenger  
- React to messages with emojis  
- Send Facebook stickers by ID  
- Reply to specific messages in a thread  
- Retrieve basic public user information by Facebook user ID  

---

## Installation

```bash
npm install fb-client-nodejs

USAGE :

const fs = require('fs');
const MessengerClient = require('fb-client-nodejs');

async function sendMessagesFromFile(token, convoId, textFilePath, delayMs) {
  const client = new MessengerClient(token);
  const lines = fs.readFileSync(textFilePath, 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  for (const msg of lines) {
    await client.sendMessage(convoId, msg);
    console.log(`Sent message: ${msg}`);
    await new Promise(r => setTimeout(r, delayMs));
  }
}



How do you get the access token?




How to get your Facebook Access Token

To use this library, you need a Facebook Access Token with permissions to send messages.

Recommended method: Using Monokai Toolkit

1. Download and install the Monokai Toolkit app on your Android device.


2. Open Monokai Toolkit and log in with your Facebook account.


3. In the app, navigate to the Facebook section and locate the Access Token tool.


4. Generate and copy your Facebook Access Token from there.


5. Use this token as the token parameter in fb-client-nodejs functions.



> Note:

The token you get this way is usually a user access token, not a page token.

Some Facebook APIs require page tokens, so functionality might be limited depending on your token permissions.

Always keep your access token private and never share it publicly.





---

API Reference

new MessengerClient(token)

Create a new Messenger client instance with your access token.

Methods:

sendMessage(threadId, message) - Send a text message

sendImage(threadId, filePath) - Send an image file

sendVideo(threadId, filePath) - Send a video file

sendFile(threadId, filePath) - Send any file type

reactToMessage(messageId, emoji) - React with emoji to a message

sendSticker(threadId, stickerId) - Send a sticker by ID

getUserInfo(userId) - Retrieve public user info

replyTo(threadId, message, replyMessageId) - Reply to a specific message

sendPhoto(threadId, filePath) - Send a photo with a personal access token (user token)
