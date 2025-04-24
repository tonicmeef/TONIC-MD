
const config = require('../config');
const axios = require('axios');
const { cmd } = require('../command');


cmd({
  pattern: "shorten ?(.*)",
  react: "🥱",
  desc: "Shorten a URL",
  category: "tools",
  use: '.shorten <link>',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const url = m.match[1];
    if (!url) return reply('Please provide a URL to shorten.');

    const api = 'https://api.davidcyriltech.my.id/tinyurl?url=';
    try {
      const response = await axios.get(api + url);
      if (response.data.status === 'success') {
        await conn.sendMessage(from, { text: `Shortened URL: ${response.data.result}` }, { quoted: mek });
      } else {
        await conn.sendMessage(from, { text: `Error shortening URL: ${response.data.message}` }, { quoted: mek });
      }
    } catch (error) {
      console.error('Error making API request:', error);
      reply('Error shortening URL. Please try again later.');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    reply('An error occurred. Please try again later.');
  }
});
