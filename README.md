
# fb-client-nodejs

🔥 Full-featured Node.js library to send messages via Facebook Messenger using access tokens.

## Features

- ✅ Text messages
- 🖼️ Image upload & send
- 📹 Video upload & send
- 📎 PDF/files/documents
- 😍 Emoji Reactions
- 💬 Message replies
- 🧠 User info lookup
- 🎭 Sticker support

## Installation

```bash
npm install fb-client-nodejs



# A nodejs library that supports Facebook login with an access token without email and password authentication 
# Example use :
# Example bot : const MessengerClient = require('./index');
const fs = require('fs');

const token = 'EAAA...';
const threadId = '1234567890123456';

const bot = new MessengerClient(token);
const lines = fs.readFileSync('./messages.txt', 'utf-8').split('\n').filter(Boolean);

(async () => {
  for (const msg of lines) {
    await bot.sendMessage(threadId, msg);
    console.log(`Sent: ${msg}`);
    await new Promise(r => setTimeout(r, 3000));
  }
})();

