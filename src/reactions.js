const axios = require('axios');

async function sendReaction(token, messageId, emoji) {
  const url = `https://graph.facebook.com/v15.0/${messageId}/reactions`;

  const data = {
    access_token: token,
    reaction: emoji, // ❤️, 😆, 😢, 😡 etc
  };

  const res = await axios.post(url, data);
  return res.data;
}

module.exports = { sendReaction };
