const {
  sendTextMessage,
  sendImageMessage,
  sendVideoMessage,
  sendFileMessage,
} = require('./messages-send');

const { sendReaction } = require('./reactions');

class MessengerClient {
  constructor(token) {
    if (!token) throw new Error('Token is required');
    this.token = token;
  }

  sendMessage(threadId, message) {
    return sendTextMessage(this.token, threadId, message);
  }

  sendImage(threadId, filePath) {
    return sendImageMessage(this.token, threadId, filePath);
  }

  sendVideo(threadId, filePath) {
    return sendVideoMessage(this.token, threadId, filePath);
  }

  sendFile(threadId, filePath) {
    return sendFileMessage(this.token, threadId, filePath);
  }

  reactToMessage(messageId, emoji) {
    return sendReaction(this.token, messageId, emoji);
  }
}

module.exports = MessengerClient;
