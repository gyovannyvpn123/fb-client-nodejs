const axios = require('axios');

async function getUserInfo(token, userId) {
  const url = `https://graph.facebook.com/v15.0/${userId}?access_token=${token}`;
  const res = await axios.get(url);
  return res.data;
}

module.exports = { getUserInfo };
