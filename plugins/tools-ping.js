const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: "speed",
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const startTime = Date.now();

//fale status and quoted 
const tonic = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: {
newsletterAdminInviteMessage: {
newsletterJid: '120363374632065395@newsletter',
    newsletterName: 'Tᴏɴɪᴄ Tᴇᴄʜ Pɪɴɢ',
    caption: 'Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ'}}}

        // Add a short delay
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay

        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the ping result
        await conn.sendMessage(from, { 
            text: `> *TONIC-MD SPEED=>: ${ping}ms*`, 
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363374632065395@newsletter',
                    newsletterName: 'Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.',
                    serverMessageId: 143
                }
            }
        }, { quoted: tonic });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

// ping2 

cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    
    // fake status and quoted 
    const tonic = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: {
newsletterAdminInviteMessage: {
newsletterJid: '120363374632065395@newsletter',
    newsletterName: 'Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.',
    caption: 'Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.'}}}
    
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '> ʟᴏᴀᴅɪɴɢ...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `> *sᴘᴇᴇᴅ ɪs 🔥  : ${ping}ms*` }, { quoted: tonic })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
