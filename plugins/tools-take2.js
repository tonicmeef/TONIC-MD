const { cmd } = require("../command");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");

cmd({
    pattern: "take",
    alias: ['steal'],
    react: "🖼️",
    desc: "Create sticker with custom pack",
    category: "media",
    filename: __filename,
    use: ".take packname|author (reply to image)"
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        const [packname, author] = q.split("|").map(s => s.trim());
        if (!packname || !author) return reply("Usage: .take packname|author");

        if (!['imageMessage', 'videoMessage'].includes(quoted?.mtype)) {
            return reply("❌ Reply to an image/video");
        }

        const media = await downloadMediaMessage(quoted, 'buffer', {});
        await conn.sendMessage(from, {
            sticker: media,
            packname: packname || config.STICKER_PACKNAME,
            author: author || config.STICKER_AUTHOR
        }, { quoted: mek });
        
    } catch (e) {
        console.error(e);
        reply("❌ Error creating sticker");
    }
});