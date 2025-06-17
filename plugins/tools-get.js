const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "fetch",
    alias: ["get", "api", "fetchapi", "apifetch"],
    desc: "Fetch data from a provided URL or API",
    category: "main",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        const q = args.join(' ').trim(); // Extract the URL or API query
        if (!q) return reply('❌ Please provide a valid URL or query.');

        if (!/^https?:\/\//.test(q)) return reply('❌ URL must start with http:// or https://.');

        const data = await fetchJson(q); // Use your fetchJson utility function to get data
        const content = JSON.stringify(data, null, 2);

        await conn.sendMessage(from, {
            text: `🔍 *Fetched Data*:\n\`\`\`${content.slice(0, 2048)}\`\`\`\n\n📢 *> © Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*`,
            contextInfo: {
                mentionedJid: [],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: "120363374632065395@newsletter", // Example newsletter JID
                  newsletterName: "Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.",
                  serverMessageId: 143,
            }
        },  quoted: mek });

    } catch (e) {
        console.error("Error in fetch command:", e);
        reply(`❌ An error occurred`);
    }
});
