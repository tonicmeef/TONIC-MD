const {
  cmd,
  commands
} = require('../command');
const axios = require('axios');

cmd({
  pattern: 'imgsearch',
  alias: ['img','pin','image'],
  react: '🔍',
  desc: 'Search for images on Google',
  category: 'image',
  filename: __filename
}, async (conn, mek, m, {
  body,
  from,
  quoted,
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
    const text = body.trim().replace(command, '').trim();
    if (!text) {
        return reply(`*🔎 ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ sᴇᴀʀᴄʜ ᴋᴇʏᴡᴏʀᴅs ᴇxᴀᴍᴘʟᴇ: .ɪᴍᴀɢᴇ ᴄᴀᴛ*`);
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

        const apiResponse = await axios.get(`https://apis.davidcyriltech.my.id/googleimage`, {
            params: { query: text }
        });

        const { success, results } = apiResponse.data;

        if (!success || !results || results.length === 0) {
            return reply(`❌ No images found for "${text}". Try another search.`);
        }

        const maxImages = Math.min(results.length, 5);
        for (let i = 0; i < maxImages; i++) {
            await conn.sendMessage(m.chat, {
                image: { url: results[i] },
                caption: `🖼️ *ɪᴍᴀɢᴇ sᴇᴀʀᴄʜ*\n\n🔎 *ǫᴜᴇʀʏ:* "${text}"\n📄 *ʀᴇsᴜʟᴛ:* ${i + 1}/${maxImages}\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴏɴɪᴄ ᴍᴅ*`,
            }, { quoted: m });
        }

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (error) {
        console.error("Error in Image Search:", error);
        reply(`❌ *Error fetching images. Try again later.*`);
    }
});


//########
cmd({
  'pattern': "img2",
  'alias': ["image2", "pinterest2", "pinimg2"],
  'react': '🖼️',
  'desc': "Search and download images from Pinterest using keywords.",
  'category': "image",
  'use': ".img <keywords>",
  'filename': __filename
}, async (_0x1a9409, _0x59fdb9, _0x3f150e, {
  from: _0x163393,
  args: _0x12b1f7,
  reply: _0x2ac5cb
}) => {
  try {
    const _0x3207b0 = _0x12b1f7.join(" ");
    if (!_0x3207b0) {
      return _0x2ac5cb("*🔎 ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ sᴇᴀʀᴄʜ ᴋᴇʏᴡᴏʀᴅs ᴇxᴀᴍᴘʟᴇ: .ɪᴍᴀɢᴇ2 ᴄᴀᴛ*");
    }
    _0x2ac5cb("*🔍 Showing Results For - " + _0x3207b0 + "...*");
    const _0x2f5556 = 'https://apis.davidcyriltech.my.id/googleimage?query=' + encodeURIComponent(_0x3207b0);
    const _0x530cac = await axios.get(_0x2f5556);
    if (!_0x530cac.data || !_0x530cac.data.result || _0x530cac.data.result.length === 0x0) {
      return _0x2ac5cb("❌ No images found for \"" + _0x3207b0 + "\".");
    }
    const _0x82a454 = _0x530cac.data.result;
    for (let _0xecb4cf = 0x0; _0xecb4cf < Math.min(_0x82a454.length, 0x5); _0xecb4cf++) {
      const _0x58b5b7 = _0x82a454[_0xecb4cf];
      if (_0x58b5b7.images_url) {
        await _0x1a9409.sendMessage(_0x163393, {
          'image': {
            'url': _0x58b5b7.images_url
          },
          'caption': "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʟɪ ᴍᴅ*" 
        }, {
          'quoted': _0x59fdb9
        });
      }
    }
    if (_0x82a454.every(_0x45deb7 => !_0x45deb7.images_url)) {
      _0x2ac5cb("❌ No valid image URLs found in the results.");
    }
  } catch (_0x422b47) {
    console.error(_0x422b47);
    _0x2ac5cb("❌ An error occurred while processing your request.");
  }
});
