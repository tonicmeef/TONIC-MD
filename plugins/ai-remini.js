const fs = require('fs');
const config = require('../config');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
  pattern: "remini",
  react: "🦄",
  desc: "Enhance image quality using Remini API",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
  quoted,
  reply
}) => {
  try {
    // Debug: Log quoted to understand its structure
    console.log(quoted);

    // Validate that the quoted message contains an image
    if (!quoted || !quoted.message || (!quoted.message.imageMessage && !quoted.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage)) {
      return reply("Please reply to an image!");
    }

    // Download and encode the image in Base64
    const imagePath = await conn.downloadMedia(quoted);
    if (!imagePath) {
      return reply("Failed to download the image!");
    }

    const imageData = fs.readFileSync(imagePath);
    const imageBase64 = imageData.toString('base64');

    // Call the Remini API
    const apiUrl = `https://api.davidcyriltech.my.id/remini`;
    const response = await fetchJson(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 }),
    });

    // Handle API response
    if (!response || response.status !== 200 || !response.data) {
      return reply("Failed to enhance image quality!");
    }

    // Send the enhanced image
    await conn.sendMessage(m.chat, { image: { url: response.data } });

    // Clean up the temporary file
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error(error);
    reply("An error occurred!");
  }
});
