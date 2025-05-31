const { cmd } = require('../command');
const axios = require('axios');
const moment = require('moment');

// Variable to keep track of whether the daily fact feature is enabled
let isFactEnabled = false;
let factTimer; // To store the interval timer for daily facts

// Define the themes for each day of the week
const dailyThemes = {
    Monday: 'amour',        // Love
    Tuesday: 'motivation',  // Motivation
    Wednesday: 'science',   // Science
    Thursday: 'blague',     // Joke
    Friday: 'conseils',     // Tips
    Saturday: 'amour',      // Love
    Sunday: 'motivation',   // Motivation
};

cmd({
    pattern: "dailyfact",
    desc: "Get a random fact of the day and control the daily fact feature.",
    react: "📚",
    category: "fun",
    use: ".dailyfact on/off",
    filename: __filename
}, async (conn, mek, m, { reply, args }) => {
    // Check the first argument (on/off)
    if (args[0] === "on") {
        if (isFactEnabled) {
            return reply("❌ The daily fact feature is already enabled.");
        }
        
        isFactEnabled = true;
        reply("✅ The daily fact feature is now enabled. I will send a fact every day at 6 AM (Cameroon time).");

        // Set the daily fact interval at 6 AM (Cameroon time)
        sendDailyFactAt6AM(conn, reply);
    } 
    else if (args[0] === "off") {
        if (!isFactEnabled) {
            return reply("❌ The daily fact feature is already disabled.");
        }

        clearInterval(factTimer); // Clear the timer when the feature is disabled
        isFactEnabled = false;
        reply("❌ The daily fact feature is now disabled.");
    } 
    else {
        reply("❌ Please specify 'on' or 'off' to enable or disable the daily fact feature.\nExample: `.dailyfact on`");
    }
});

// Function to fetch and send the daily fact
async function sendDailyFact(conn, reply) {
    try {
        const dayOfWeek = moment().format('dddd'); // Get the current day of the week
        const theme = dailyThemes[dayOfWeek]; // Get the theme for the current day

        // Send a message saying we're fetching the daily fact
        reply(`Fetching a ${theme} fact for you...`);

        // API endpoint for random facts with the theme based on the current day
        const response = await axios.get(`https://uselessfacts.jsph.pl/random.json?language=fr`);

        // Extract the fact from the API response
        const fact = response.data.text;

        // Send the fact back to the user
        reply(`📚 Here's a ${theme} fact for you on ${dayOfWeek}:\n\n*${fact}*\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴏɴɪᴄ ᴛᴇᴄʜ*`);
        
    } catch (error) {
        console.error("Error fetching daily fact:", error.message);
        reply("❌ Sorry, I couldn't fetch a fact for today. Please try again later.");
    }
}

// Function to calculate the time until 6 AM and set the interval
function sendDailyFactAt6AM(conn, reply) {
    const now = moment();
    const targetTime = moment().set({ hour: 6, minute: 0, second: 0, millisecond: 0 }); // 6 AM time

    if (now.isAfter(targetTime)) {
        // If it's already past 6 AM today, set the time for 6 AM tomorrow
        targetTime.add(1, 'days');
    }

    const timeUntilNextRun = targetTime.diff(now); // Time difference in milliseconds

    // Set an interval to send the daily fact at 6 AM every day
    factTimer = setInterval(() => {
        sendDailyFact(conn, reply); // Send the fact at 6 AM every day
    }, 86400000); // Repeat every 24 hours

    // Wait until the next 6 AM and send the first fact
    setTimeout(() => {
        sendDailyFact(conn, reply); // Send the first fact
    }, timeUntilNextRun);
}
cmd({
    pattern: "age",
    desc: "Calculate your age based on your date of birth.",
    react: "🎉",
    category: "utility",
    use: ".age <DD/MM/YYYY>",
    filename: __filename
}, async (conn, mek, m, { reply, args }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide your date of birth in the format DD/MM/YYYY.\nExample: `.age 15/08/1995`");
        }

        const birthDate = args[0]; // Get the date of birth from user input
        const dateOfBirth = moment(birthDate, "DD/MM/YYYY");

        // Validate the provided date
        if (!dateOfBirth.isValid()) {
            return reply("❌ Invalid date format. Please use DD/MM/YYYY.\nExample: `.age 15/08/1995`");
        }

        // Calculate the age by comparing the current date with the birthdate
        const age = moment().diff(dateOfBirth, 'years');
        
        // Send the calculated age back to the user
        reply(`🎉 Your age is: *${age}* years old.`);

    } catch (error) {
        console.error("Error calculating age:", error.message);
        reply("❌ An error occurred while calculating your age. Please try again later.");
    }
});

cmd({
  pattern: "timezone",
  desc: "Get the current time for a specific country.",
  react: "🕰️",
  category: "utility",
  use: ".timezone <country>",
  filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length === 0) {
      return reply("❌ Please provide a country. Example: `.timezone Pakistan`");
    }
    
    const country = args.join(" ");
    const apiKey = process.env.IPGEO_API_KEY || "d6ca7264dd77441cbee974717ded084d";
    const url = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&country=${encodeURIComponent(country)}`;
    
    const response = await axios.get(url);
    const data = response.data;
    
    if (!data || !data.date_time) {
      return reply("❌ Unable to fetch time for the specified country. Please check your input.");
    }
    
    const message = `🕰️ *Current Time in ${data.country_name}*\n\n` +
                    `📅 Date & Time: ${data.date_time}\n` +
                    `⌚ Time Zone: ${data.timezone}`;
                    
    reply(message);
    
  } catch (error) {
    console.error("Error fetching time:", error.message);
    reply("❌ Sorry, I couldn't fetch the time. Please check your input and try again.");
  }
});

cmd({
  pattern: "photo",
  alias: ["toimage", "photo"],
  desc: "Convert a sticker to an image.",
  category: "tools",
  filename: __filename,
}, async (conn, mek, m, { reply }) => {
  try {
    // Vérifier si l'utilisateur a répondu à un message
    if (!m.quoted) {
      return reply("*📛 ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀ sᴛɪᴄᴋᴇʀ ᴛᴏ ᴄᴏɴᴠᴇʀᴛ ɪᴛ ᴛᴏ ᴀɴ ɪᴍᴀɢᴇ.*");
    }

    // Vérifier si le message cité est un sticker
    if (m.quoted.mtype !== "stickerMessage") {
      return reply("❌ The replied message is not a sticker.");
    }

    // Télécharger le sticker
    let media = await m.quoted.download();

    // Vérifier si le téléchargement a réussi
    if (!media) {
      return reply("❌ Failed to download the sticker.");
    }

    // Envoyer l'image convertie
    await conn.sendMessage(m.chat, { image: media, caption: "*✅ HERE IS YOUR IMAGE.*" }, { quoted: m });

  } catch (error) {
    reply("❌ An error occurred while converting the sticker to an image.");
    console.error(error);
  }
});
