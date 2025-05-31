
const { cmd } = require("../command");
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

const axios = require("axios");

cmd({ 
    pattern: "song", 
    alias: ["play", "mp3"], 
    react: "🎶", 
    desc: "Download YouTube song", 
    category: "main", 
    use: '.song <query>', 
    filename: __filename 
}, async (conn, mek, m, { from, sender, reply, q }) => { 
    try {
        if (!q) return reply("Please provide a song name or YouTube link.");

        const yt = await ytsearch(q);
        if (!yt.results.length) return reply("No results found!");

        const song = yt.results[0];
        const apiUrl = `https://api.gifted.my.id/api/download/ytmp3?apikey=gifted&url=${encodeURIComponent(song.url)}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data?.result?.downloadUrl) return reply("Download failed. Try again later.");

    await conn.sendMessage(from, {
    audio: { url: data.result.downloadUrl },
    mimetype: "audio/mpeg",
    fileName: `${song.title}.mp3`,
    contextInfo: {
        externalAdReply: {
            title: song.title.length > 25 ? `${song.title.substring(0, 22)}...` : song.title,
            body: "Join our WhatsApp Channel",
            mediaType: 1,
            thumbnailUrl: song.thumbnail.replace('default.jpg', 'hqdefault.jpg'),
            sourceUrl: 'https://whatsapp.com/channel/0029VayQpwx8F2pIKEWkcd0f',
            mediaUrl: 'https://whatsapp.com/channel/0029VayQpwx8F2pIKEWkcd0f',
            showAdAttribution: true,
            renderLargerThumbnail: true
        }
    }
}, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("An error occurred. Please try again.");
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
