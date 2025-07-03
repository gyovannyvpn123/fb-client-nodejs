const axios = require('axios');

async function replyToMessage(token, threadId, messageText, replyToMessageId) {
  const url = `https://graph.facebook.com/v15.0/t_${threadId}/`;
  const data = {
    access_token: token,
    message: messageText,
    reply_to_message_id: replyToMessageId,
  };

  const res = await axios.post(url, data);
  return res.data;
}

module.exports = { replyToMessage };
