const moment = require("moment");
const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: 'qrcode',
  alias: ['qr'],
  react: '🔄',
  desc: 'Generate a QR code.',
  category: 'main',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) return reply('Please provide text to generate QR code.');
    await reply('> *Generating QR code...🔄*');
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(q)}&size=200x200`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    
    await conn.sendMessage(m.chat, { image: buffer }, { quoted: m, caption: 'QR DONE BY TONIC-MD' });
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});
