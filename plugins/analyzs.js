const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: 'analyse',
  alias: ['vision'],
  react: '💡',
  desc: 'Analyze image with instruction.',
  category: 'tools',
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
  if (!quoted) return reply('Quote an image with instructions for bot to analyze.');
  if (!body) return reply('Please provide instructions for the bot to analyze the image.');
  if (!q) return reply('What do you what me to do ?');

  try {
    const buffer = await m.quoted.download();
    if (!buffer) return reply('Failed to download the quoted image.');

    const base64String = buffer.toString('base64');
    await reply('```Analysing Image wait...🔎```');

    const response = await axios.post('https://api.dreaded.site/api/gemini-analyze', {
      query: q,
      imageBuffer: base64String
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await reply(response.data.result);
  } catch (error) {
    const errorMessage = error.message || 'An unknown error occurred.';
    const maxErrorLength = 200;
    const replyMessage = errorMessage.length > maxErrorLength
      ? errorMessage.substring(0, maxErrorLength) + '...'
      : errorMessage;

    console.error('Error in sending request:', error);
    await reply(replyMessage);
  }
});
