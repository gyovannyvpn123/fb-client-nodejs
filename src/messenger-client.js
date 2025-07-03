const {
  sendTextMessage,
  sendImageMessage,
  sendVideoMessage,
  sendFileMessage,
} = require('./messages-send');

const { sendReaction } = require('./reactions');
const { sendSticker } = require('./sticker-send');
const { getUserInfo } = require('./user-info');
const { replyToMessage } = require('./reply-message');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

class MessengerClient {
  constructor(token) {
    if (!token) throw new Error('Access token is required');
    this.token = token;
  }

  /**
   * Send a text message to a thread (user or group).
   */
  async sendMessage(threadId, message) {
    if (!threadId || !message) throw new Error('Thread ID and message required');
    return await sendTextMessage(this.token, threadId, message);
  }

  /**
   * Send an image to a thread.
   */
  async sendImage(threadId, filePath) {
    if (!threadId || !filePath) throw new Error('Thread ID and file path required');
    return await sendImageMessage(this.token, threadId, filePath);
  }

  /**
   * Send a video to a thread.
   */
  async sendVideo(threadId, filePath) {
    if (!threadId || !filePath) throw new Error('Thread ID and file path required');
    return await sendVideoMessage(this.token, threadId, filePath);
  }

  /**
   * Send a file (e.g. PDF, DOC, etc).
   */
  async sendFile(threadId, filePath) {
    if (!threadId || !filePath) throw new Error('Thread ID and file path required');
    return await sendFileMessage(this.token, threadId, filePath);
  }

  /**
   * React to a message with emoji (e.g. ❤️, 😂, 🔥).
   */
  async reactToMessage(messageId, emoji) {
    if (!messageId || !emoji) throw new Error('Message ID and emoji required');
    return await sendReaction(this.token, messageId, emoji);
  }

  /**
   * Send a Facebook sticker by ID.
   */
  async sendSticker(threadId, stickerId) {
    if (!threadId || !stickerId) throw new Error('Thread ID and sticker ID required');
    return await sendSticker(this.token, threadId, stickerId);
  }

  /**
   * Get public Facebook profile info (name, id etc).
   */
  async getUserInfo(userId) {
    if (!userId) throw new Error('User ID is required');
    return await getUserInfo(this.token, userId);
  }

  /**
   * Reply to a specific message in thread.
   */
  async replyTo(threadId, message, replyMessageId) {
    if (!threadId || !message || !replyMessageId) {
      throw new Error('Thread ID, message and replyMessageId are required');
    }
    return await replyToMessage(this.token, threadId, message, replyMessageId);
  }

  /**
   * Send a photo (image file) using Graph API directly.
   */
  async sendPhoto(threadId, filePath) {
    if (!threadId || !filePath) throw new Error('Thread ID and file path required');
    if (!fs.existsSync(filePath)) throw new Error('Image file not found at path: ' + filePath);

    const form = new FormData();
    form.append('recipient', JSON.stringify({ thread_key: threadId }));
    form.append('message', JSON.stringify({ attachment: { type: 'image', payload: {} } }));
    form.append('filedata', fs.createReadStream(filePath));

    const headers = {
      Authorization: `Bearer ${this.token}`,
      ...form.getHeaders()
    };

    const url = 'https://graph.facebook.com/v18.0/me/messages';
    const response = await axios.post(url, form, { headers });
    return response.data;
  }
}

module.exports = MessengerClient;
