const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function uploadMedia(token, filePath, type = 'file') {
  const url = `https://graph.facebook.com/v15.0/me/message_attachments`;

  const form = new FormData();
  form.append('access_token', token);
  form.append('message_attachment', fs.createReadStream(filePath));
  form.append('type', type); // image, video, file

  const res = await axios.post(url, form, {
    headers: form.getHeaders(),
  });

  return res.data;
}

module.exports = { uploadMedia };
