import axios from "axios";
import config from '../config.cjs';

const bible = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "bible") {
    try {
      m.reply("📖 Fetching Bible verse...");

      const apiUrl = args 
        ? `https://kaiz-apis.gleeze.com/api/bible?verse=${encodeURIComponent(args)}`
        : "https://kaiz-apis.gleeze.com/api/bible"; // For random verse if no args

      const { data } = await axios.get(apiUrl);

      if (!data || !data.verse || !data.verse.length) {
        return m.reply("❌ Verse not found. Please check your reference.");
      }

      const verseData = data.verse[0];
      const verseText = `📖 *${verseData.book_name} ${verseData.chapter}:${verseData.verse}*\n\n${verseData.text}\n`;

      await gss.sendMessage(
        m.from,
        { 
          text: verseText,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363419090892208@newsletter',
              newsletterName: "EF-PRIME",
              serverMessageId: 143
            }
          }
        },
        { quoted: m }
      );

    } catch (error) {
      console.error(error);
      m.reply("❌ An error occurred: " + error.message);
    }
  }
};

export default bible;
