const axios = require('axios');

async function sendSticker(token, threadId, stickerId) {
  const url = `https://graph.facebook.com/v15.0/t_${threadId}/`;
  const data = {
    access_token: token,
    sticker_id: stickerId,
  };

  const res = await axios.post(url, data);
  return res.data;
}

module.exports = { sendSticker };
