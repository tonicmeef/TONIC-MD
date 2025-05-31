const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "xstalk",
  alias: ["twitterstalk", "twtstalk"],
  desc: "Get details about a Twitter/X user.",
  react: "🔍",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid Twitter/X username.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/xstalk?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply("⚠️ Failed to fetch Twitter/X user details. Ensure the username is correct.");
    }

    const user = data.data;
    const verifiedBadge = user.verified ? "✅" : "❌";

    const caption = `╭━━━〔 *TWITTER/X STALKER* 〕━━━⊷\n`
      + `┃👤 *Name:* ${user.name}\n`
      + `┃🔹 *Username:* @${user.username}\n`
      + `┃✔️ *Verified:* ${verifiedBadge}\n`
      + `┃👥 *Followers:* ${user.followers_count}\n`
      + `┃👤 *Following:* ${user.following_count}\n`
      + `┃📝 *Tweets:* ${user.tweets_count}\n`
      + `┃📅 *Joined:* ${user.created}\n`
      + `┃🔗 *Profile:* [Click Here](${user.url})\n`
      + `╰━━━⪼\n\n`
      + `🔹 *>© Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*`;

    await conn.sendMessage(from, {
      image: { url: user.avatar },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});
