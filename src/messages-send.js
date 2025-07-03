const axios = require('axios');
const { uploadMedia } = require('./media-upload');

async function sendTextMessage(token, threadId, message) {
  const url = `https://graph.facebook.com/v15.0/t_${threadId}/`;
  const data = { access_token: token, message };

  const res = await axios.post(url, data);
  return res.data;
}

async function sendImageMessage(token, threadId, filePath) {
  const { attachment_id } = await uploadMedia(token, filePath, 'image');
  return await sendAttachment(token, threadId, attachment_id);
}

async function sendVideoMessage(token, threadId, filePath) {
  const { attachment_id } = await uploadMedia(token, filePath, 'video');
  return await sendAttachment(token, threadId, attachment_id);
}

async function sendFileMessage(token, threadId, filePath) {
  const { attachment_id } = await uploadMedia(token, filePath, 'file');
  return await sendAttachment(token, threadId, attachment_id);
}

async function sendAttachment(token, threadId, attachment_id) {
  const url = `https://graph.facebook.com/v15.0/t_${threadId}/`;
  const data = {
    access_token: token,
    attachment_id,
  };

  const res = await axios.post(url, data);
  return res.data;
}

module.exports = {
  sendTextMessage,
  sendImageMessage,
  sendVideoMessage,
  sendFileMessage,
};
