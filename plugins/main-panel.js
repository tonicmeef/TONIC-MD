const { cmd } = require("../command");

cmd({
    pattern: "panel",
    desc: "All About panels",
    category: "main",
    react: "🧓",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const familyList = `╔┈「 *_PANEL PRICE LIST_* 」
╎✞   *1ɢʙ- 800#*
╎✞   *2ɢʙ- 1200#*
╎✞   *3ɢʙ- 1500#*
╎✞   *4ɢʙ- 1800#*
╎✞   *5ɢʙ- 2000*
╎✞   *6ɢʙ- 2500#*
╎✞   *7ɢʙ- 3000#*
╎✞   *8ɢʙ- 3500*
╎✞   *9ɢʙ- 4000*
╎✞   *10ɢʙ- 4500*
╎➩ *ᴜɴʟɪᴍɪᴛᴇᴅ ᴘᴀɴᴇʟ -5000#*
╚┈┈┈┈┈┈┈┈┈┈┈

*ɪғ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴘᴜʀᴄʜᴀsᴇ sᴇɴᴅ ᴀ ᴅᴍ*
+263783866754
    `;

    try {
        // Envoi de la réponse avec l'image et la liste de la famille
        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/scvigx.jpg" },
            caption: familyList.trim()
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the family list. Please try again.*");
    }
});
