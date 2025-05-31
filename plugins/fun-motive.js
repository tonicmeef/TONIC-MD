/*const { cmd } = require('../command');

// Array of motivational quotes
const quotes = [
  "Believe you can and you're halfway there.",
  "Don’t watch the clock; do what it does. Keep going.",
  "You are never too old to set another goal or to dream a new dream.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "The future depends on what you do today.",
  "Do what you can with all you have, wherever you are.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."
];

// Define the plugin
cmd({
  pattern: "motivate",
  react: "🌟",
  desc: "Get a random motivational quote",
  category: "fun",
  use: '.motivate',
  filename: __filename
}, async (conn, mek, m, { from }) => {
  try {
    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Send the quote as a message
    await conn.sendMessage(from, { text: `🌟 *Motivational Quote:* 🌟\n\n"${randomQuote}"` }, { quoted: mek });
  } catch (error) {
    console.error(error);
    conn.sendMessage(from, { text: '*❌ An error occurred while fetching a motivational quote.*' }, { quoted: mek });
  }
});
*/