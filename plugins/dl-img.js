const { cmd, commands } = require("../command");
const axios = require("axios");

cmd({
    pattern: "img",
    alias: ["pinterest", "image", "searchpin"],
    react: "🚀",
    desc: "Search and download Pinterest images using the API.",
    category: "fun",
    use: ".pin <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("*Please provide a search query.*");
        }

        
        await reply(`*🔎 Downloading Images For ${query}...*`);


        const url = `https://api.diioffc.web.id/api/search/pinterest?query=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        // Validate response
        if (!response.data || !response.data.result || response.data.result.length === 0) {
            return reply("*No results found. Please try another keyword.*");
        }

        const results = response.data.result;  
        const selectedImages = results.sort(() => 0.5 - Math.random()).slice(0, 5);
      
        for (let i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            await conn.sendMessage(
                from,
                {
                    image: { url: image.src },
                    caption: `*Results For:* ${query}\n\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*`
                },
                { quoted: mek }
            );
        }
    } catch (error) {
        console.error(error);
        reply("*❌ An error occurred while processing your request. Please try again later.*");
    }
});
