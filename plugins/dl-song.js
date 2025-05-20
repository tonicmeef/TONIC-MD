
const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

// List of APIs to try (fallback mechanism)
const APIS = [
  "https://api.davidcyriltech.my.id/download/ytmp3?url=",
];

cmd({
  pattern: "play",
  react: '🎶',
  alias: ['ytmp3','ytplay','ytdoc'],
  desc: "Download audio from YouTube by searching for keywords (using multiple APIs).",
  category: "music",
  use: ".play <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply("*Please provide a song name or keywords to search for.*");
    }

    reply("*TONIC-MD 🤖 SEARCHING FOR QUERY*");

    // Search for videos on YouTube
    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}".`);
    }

    const firstResult = searchResults.videos[0];
    const videoUrl = firstResult.url;

    let downloadUrl = null;
    let title = firstResult.title;

    // Try each API until one works
    for (const api of APIS) {
      try {
        const apiUrl = api + encodeURIComponent(videoUrl);
        const response = await axios.get(apiUrl);

        if (response.data && response.data.success && response.data.result && response.data.result.download_url) {
          downloadUrl = response.data.result.download_url;
          title = response.data.result.title || title;
          break; // Exit loop if successful
        }
      } catch (error) {
        console.error(`API failed: ${api}`, error);
      }
    }

    if (!downloadUrl) {
      return reply("❌ All APIs failed. Please try again later.");
    }

    // Send the audio file
    await conn.sendMessage(from, {
      document: { url: downloadUrl },
      mimetype: "audio/mpeg",
      fileName: title + ".mp3",
      caption: `> Song downloaded Successfully 🤖`
    }, { quoted: mek });

    reply(`✅ *${title}* has been downloaded successfully!`);
  } catch (error) {
    console.error("Error downloading audio:", error);
    reply("❌ An error occurred while processing your request.");
  }
});

//song cmd
cmd({
  pattern: "play2",
  react: '🎵',
  alias: ['ridza','ytaudio','audio' ],
  desc: "Download audio from YouTube by searching for keywords (using multiple APIs).",
  category: "music",
  use: ".play <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply("*Please provide a song name or keywords to search for.*");
    }

    reply(" *TONIC-MD 🤖 SEARCHING FOR QUERY* ");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}".`);
    }

    const firstResult = searchResults.videos[0];
    const videoUrl = firstResult.url;

    // List of APIs to try in order
    const apis = [
      `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`,
      `https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${videoUrl}`,
      `https://api.fgmods.xyz/api/downloader/ytmp3?url=${videoUrl}`,
      `https://www.dark-yasiya-api.site/download/ytmp3?url=${videoUrl}`
    ];

    let response;
    for (const apiUrl of apis) {
      try {
        response = await axios.get(apiUrl);
        if (response.data.success) {
          break; // Exit the loop if the API call is successful
        }
      } catch (error) {
        console.error(`API call failed: ${apiUrl}`, error);
      }
    }

    if (!response || !response.data.success) {
      return reply(`❌ Failed to fetch audio for "${searchQuery}".`);
    }

    const { title, download_url } = response.data.result;

    // Send the audio file
    await conn.sendMessage(from, {
      audio: { url: download_url },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

    reply(`✅ *${title}* has been downloaded successfully!`);
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});
