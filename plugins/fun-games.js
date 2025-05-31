const axios = require('axios')
const fetch = require('node-fetch');
const {cmd , commands} = require('../command')
// ship command 
const toM = (a) => '@' + a.split('@')[0];
cmd({
    pattern: "ship",
    alias: ["cup", "love"],
    desc: "Randomly pairs the command user with another group member.",
    react: "❤️",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, groupMetadata, reply }) => {
    try {
        // Ensure command is used in a group
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Get group participants
        const participants = groupMetadata.participants.map(p => p.id);

        if (participants.length < 2) {
            return reply("Not enough members to pair.");
        }

        // Sender of the command
        const sender = m.sender;

        // Randomly select another participant
        let randomParticipant;
        do {
            randomParticipant = participants[Math.floor(Math.random() * participants.length)];
        } while (randomParticipant === sender);

        // Pairing message
        const message = `${toM(sender)} ❤️ ${toM(randomParticipant)}\nCongratulations 💖🍻`;

        // Send the message with contextInfo
        await conn.sendMessage(from, {
            text: message,
            contextInfo: {
                mentionedJid: [sender, randomParticipant], // Mention both users
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363374632065395@newsletter',
                    newsletterName: 'Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.',
                    serverMessageId: 143,
                },
            },
        });
    } catch (e) {
        console.error("Error in ship command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});
// Insult

cmd({
  pattern: 'insult',
  desc: 'Get a random insult',
  category: "fun",
  react: '🤥',
},
async (Void, citel) => {
  try {
    let response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    let data = response.data;

    if (!data || !data.insult) {
      return citel.reply('Unable to retrieve an insult. Please try again later.');
    }

    let insult = data.insult;
    return citel.reply(`*Insult:* ${insult}`);
  } catch (error) {
    citel.reply(`Error: ${error.message || error}`);
  }
});

// joke 

cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "🤣",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;

        const jokeMessage = `
😂 *Here's a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

> *© Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*`;

        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ En Error Appears.");
    }
});

// fact

cmd({
    pattern: "fact",
    desc: "🧠 Get a random fun fact",
    react: "🧠",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';  // API for random facts
        const response = await axios.get(url);
        const fact = response.data.text;

        const funFact = `
🧠 *Tᴏɴɪᴄ Tᴇᴄʜ Random Fun Fact* 🧠

${fact}

Isn't that interesting? 😄
`;

        return reply(funFact);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
    }
});
    

// fancy 

cmd({
  pattern: "fancy",
  alias: ['font', "style"],
  react: '✍️',
  desc: "Convert text into various fonts.",
  category: "tools",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
  try {
    if (!q) {
      return reply("Please provide text to convert into fonts. Eg .fancy tonic bot");
    }

    let response = await axios.get('https://www.dark-yasiya-api.site/other/font?text=' + encodeURIComponent(q));
    let data = response.data;

    if (!data.status) {
      return reply("Error fetching fonts. Please try again later.");
    }

    let fontResults = data.result.map(font => '*' + font.name + ":*\n" + font.result).join("\n\n");
    
    // Message formatting
    let message = `*FANCY FONTS*:\n\n${fontResults}\n\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*`;

    // Sending the message with context info
    await conn.sendMessage(
      from,
      {
        text: message,
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
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error(error);
    reply("An error occurred while fetching fonts.");
  }
});

// pick-up line

cmd({
    pattern: "pickupline",
    alias: ["pickup"],
    desc: "Get a random pickup line from the API.",
    react: "💬",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // Fetch pickup line from the API
        const res = await fetch('https://api.popcat.xyz/pickuplines');
        
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        // Log the API response (for debugging purposes)
        console.log('JSON response:', json);

        // Format the pickup line message
        const pickupLine = `*Here's a pickup line for you:*\n\n"${json.pickupline}"\n\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*`;

        // Send the pickup line to the chat
        await conn.sendMessage(from, { text: pickupLine }, { quoted: m });

    } catch (error) {
        console.error("Error in pickupline command:", error);
        reply("Sorry, something went wrong while fetching the pickup line. Please try again later.");
    }
});

// char

cmd({
    pattern: "character",
    alias: ["char"],
    desc: "Check the character of a mentioned user.",
    react: "🔥",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, text, reply }) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Extract the mentioned user
        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) {
            return reply("Please mention a user whose character you want to check.");
        }

        // Define character traits
        const userChar = [
            "Sigma",
            "Generous",
            "Grumpy",
            "Overconfident",
            "Obedient",
            "Good",
            "Simp",
            "Kind",
            "Patient",
            "Pervert",
            "Cool",
            "Helpful",
            "Brilliant",
            "Sexy",
            "Hot",
            "Gorgeous",
            "Cute",
        ];

        // Randomly select a character trait
        const userCharacterSelection =
            userChar[Math.floor(Math.random() * userChar.length)];

        // Message to send
        const message = `Character of @${mentionedUser.split("@")[0]} is *${userCharacterSelection}* 🔥⚡`;

        // Send the message with mentions
        await conn.sendMessage(from, {
            text: message,
            mentions: [mentionedUser],
        }, { quoted: m });

    } catch (e) {
        console.error("Error in character command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});

// Truth command
cmd({
    pattern: "truth",
    alias: ["t", "truthquestion"],
    react: '❔',
    desc: "Get a random truth question.",
    category: "fun",
    use: '.truth',
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Inform the user
        reply("*🔍 Fetching a truth question...*");

        // API URL for truth
        const truthApiUrl = `https://api.davidcyriltech.my.id/truth`;

        // Fetch truth question from the API
        const truthResponse = await axios.get(truthApiUrl);
        if (!truthResponse.data || !truthResponse.data.success) {
            return reply("❌ Failed to fetch a truth question. Please try again later.");
        }

        // Extract truth question
        const truthQuestion = truthResponse.data.question;
        if (truthQuestion) {
            reply(`*Truth Question:* ${truthQuestion}`);
        }
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while fetching the truth question.");
    }
});

// Dare command
cmd({
    pattern: "dare",
    alias: ["d", "darequestion"],
    react: '🔥',
    desc: "Get a random dare question.",
    category: "fun",
    use: '.dare',
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Inform the user
        reply("*🔥 Fetching a dare question...*");

        // API URL for dare
        const dareApiUrl = `https://api.davidcyriltech.my.id/dare`;

        // Fetch dare question from the API
        const dareResponse = await axios.get(dareApiUrl);
        if (!dareResponse.data || !dareResponse.data.success) {
            return reply("❌ Failed to fetch a dare question. Please try again later.");
        }

        // Extract dare question
        const dareQuestion = dareResponse.data.question;
        if (dareQuestion) {
            reply(`*Dare:* ${dareQuestion}`);
        }
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while fetching the dare question.");
    }
});
