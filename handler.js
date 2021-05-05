'use strict';
require('dotenv').config();
const axios = require('axios');

module.exports.sendMessage = async (event, context, callback) => {
  const { message } = event.pathParameters;
  const { TELEGRAM_BOT_TOKEN, CHAT_ID } = process.env;

  const BASE_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`; 

  try {
    await axios.post(BASE_URL, {
      chat_id: CHAT_ID,
      text: message
    });
    return callback(null, { statusCode: 200, body: JSON.stringify({ message })});
  } catch(e) {
    console.error(e.message);
    return callback(null, { statusCode: 500, body: JSON.stringify({ message: e.error })});
  }

};
