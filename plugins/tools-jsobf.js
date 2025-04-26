
const config = require('../../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../functions');


cmd({
  pattern: 'obfuscate',
  alias: ['obf'],
  react: '🦑',
  desc: 'Obfuscates JavaScript code.',
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
    if (!q) return reply('Please provide JavaScript code to obfuscate.');
    
    const apiUrl = `https://api.giftedtech.web.id/api/tools/encrypt?apikey=gifted&code=${encodeURIComponent(q)}`;
    console.log('API Request:', apiUrl);
    
    await reply('> *Obfuscating code...*');
    
    const response = await fetchJson(apiUrl);
    console.log('API Response:', response);
    
    if (!response || !response.result) {
      throw new Error(`Invalid API response: ${JSON.stringify(response)}`);
    }
    
    const obfuscatedCode = response.result;
    await conn.sendMessage(m.chat, {
      text: obfuscatedCode
    }, {
      quoted: m
    });
  } catch (error) {
    console.error('Obfuscation error:', error);
    reply(`Failed to obfuscate code: ${error.message}`);
  }
});

