const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script"],
    desc: "Fetch information about a GitHub repository.",
    react: "📋",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/tonicmeef/TONIC-MD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `*𝐇𝐞𝐥𝐥𝐨 𝐭𝐡𝐞𝐫𝐞👋*,
 This is *TONIC-MD*, Simple whatsapp bot built by Tᴏɴɪᴄ Tᴇᴄʜ ɪɴᴄ ʙᴏᴛs. This bot was made to make the use of WhatsApp easier and fun.
 
> ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ & ғᴏʀᴋ ᴛʜᴇ ʀᴇᴘᴏ🌟🍴
 
ʀᴇᴘᴏ ʟɪɴᴋ: https://shorturl.at/O9nec 

💡 *ɴᴀᴍᴇ:* ${repoData.name}
⭐ *ᴛᴏᴛᴀʟ sᴛᴀʀs:* ${repoData.stargazers_count}
🍴 *ᴛᴏᴛᴀʟ ғᴏʀᴋs:* ${repoData.forks_count}
👀 *ᴡᴀᴛᴄʜᴇʀs:* 1
👤 *ᴏᴡɴᴇʀ:* ${repoData.owner.login}
 
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*

 `;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/aoma8i.jpg` },
            caption: formattedInfo,
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
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});