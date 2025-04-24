const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "system",
    react: "⚙️",
    alias: ["uptime","status","runtime"],
    desc: "check uptime",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `*⇆ HELLO USER ⇆*

     *${pushname}*, am alive
*╭━━━━━━━━━━━━❑*
*│▸* *ʀᴜɴᴛɪᴍᴇ* : ${runtime(process.uptime())}
*│▸* *ʜᴏsᴛɴᴀᴍᴇ* : *[${os.hostname()}]*
*│▸* *ʀᴀᴍ ᴜsᴀɢᴇ* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│▸* *ɴᴀᴍᴇ ʙᴏᴛ* : *ᴛᴏɴɪᴄ-ᴍᴅ*
*╰━━━━━━━━━━━━❒*

> *© Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*
`
// Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/aoma8i.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363374632065395@newsletter',
                    newsletterName: 'ᴛᴏɴɪᴄ-ᴍᴅ ᴜᴘᴛɪᴍᴇ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in system command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});