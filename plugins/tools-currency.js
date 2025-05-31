const { cmd } = require("../command");
const axios = require('axios');

const BASE_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = "9c8b8532d40e5da04fac9772";

cmd({
    pattern: "convertmoney",
    react: "💸",
    alias: ["currency", "cvmoney"],
    desc: "Convert money from one currency to another currency",
    category: "utility",
    use: ".currency amount fromCurrency toCurrency (e.g: .convert 100 USD EUR)",
    filename: __filename,
}, async (conn, mek, msg, { from, reply, args }) => {
    try {
        if (args.length !== 3) {
            return reply("*⭕ ɪɴᴠᴀʟɪᴅ ғᴏʀᴍᴀᴛ! ᴜsᴇ: .ᴄᴜʀʀᴇɴᴄʏ ᴀᴍᴏᴜɴᴛ ғʀᴏᴍᴄᴜʀʀᴇɴᴄʏ ᴛᴏᴄᴜʀʀᴇɴᴄʏ*\n*ᴇxᴀᴍᴘʟᴇ: .ᴄᴜʀʀᴇɴᴄʏ 𝟷𝟶𝟶 ᴜsᴅ ᴘᴋʀ*");
        }

        const amount = parseFloat(args[0]);
        const fromCurrency = args[1].toUpperCase();
        const toCurrency = args[2].toUpperCase();

        if (isNaN(amount)) {
            return reply("*❌ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ᴀᴍᴏᴜɴᴛ!*");
        }

        const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
        
        if (response.data.result === "error") {
            throw new Error(response.data["error-type"]);
        }

        const rates = response.data.conversion_rates;

        if (!rates[toCurrency]) {
            return reply("*❌ ɪɴᴠᴀʟɪᴅ ᴛᴀʀɢᴇᴛ ᴄᴜʀʀᴇɴᴄʏ ᴄᴏᴅᴇ! ᴘʟᴇᴀsᴇ ᴜsᴇ ᴠᴀʟɪᴅ ᴄᴜʀʀᴇɴᴄʏ ᴄᴏᴅᴇs ʟɪᴋᴇ ᴜsᴅ, ᴇᴜʀ, ɢʙᴘ, ᴇᴛᴄ.*");
        }

        const convertedAmount = (amount * rates[toCurrency]).toFixed(2);
        const formattedAmount = new Intl.NumberFormat().format(amount);
        const formattedResult = new Intl.NumberFormat().format(convertedAmount);

        const message = `*🌍 ᴛᴏɴɪᴄ-ᴍᴅ- ᴄᴜʀʀᴇɴᴄʏ ᴄᴏɴᴠᴇʀsɪᴏɴ 💵*\n\n` +
            `*💲 ғʀᴏᴍ:* ${formattedAmount} ${fromCurrency}\n` +
            `*🏷️ ᴛᴏ:* ${formattedResult} ${toCurrency}\n` +
            `*💰 ʀᴀᴛᴇ:* 1 ${fromCurrency} = ${rates[toCurrency]} ${toCurrency}\n\n` +
            `*⏰ ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ:* ${response.data.time_last_update_utc}`;

        reply(message);

    } catch (error) {
        console.error("Currency conversion error:", error);
        
        if (error.message === "unsupported-code") {
            reply("❌ Invalid currency code! Please use valid currency codes like USD, EUR, GBP, etc.");
        } else if (error.message === "malformed-request") {
            reply("❌ Invalid API request format. Please try again.");
        } else if (error.message === "invalid-key") {
            reply("❌ API key validation failed. Please contact the administrator.");
        } else if (error.message === "inactive-account") {
            reply("❌ API account is not active. Please contact the administrator.");
        } else if (error.message === "quota-reached") {
            reply("❌ API quota has been reached. Please try again later.");
        } else {
            reply("❌ Failed to convert currency. Please try again later.");
        }
    }
});
