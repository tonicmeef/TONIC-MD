const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const axios = require('axios')
const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const { writeFileSync } = require('fs');
const path = require('path');


let antilinkAction = "off"; // Default state
let warnCount = {}; // Track warnings per user


cmd({ 
  pattern: "setprefix", 
  alias: ["prefix"], 
  desc: "Change bot prefix.", 
  category: "settings", 
  filename: __filename 
}, async (conn, mek, m, { 
  from, 
  args, 
  isOwner, 
  reply 
}) => { 
  if (!isOwner) return reply("*📛 Only the owner can use this command!*"); 
  if (!args[0]) return reply("❌ Please provide a new prefix."); 
  const newPrefix = args[0]; 
  config.PREFIX = newPrefix; 
  // Save config to file 
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 2)); 
  reply(`*Prefix changed to:* ${newPrefix}`); 
  const { exec } = require("child_process"); 
  reply("*_DATABASE UPDATE 𝗧𝗢𝗡𝗜𝗖-𝐌𝐃 RESTARTING NOW...🚀_*"); 
  await sleep(1500); 
  exec("pm2 restart all"); 
  reply("*_𝗧𝗢𝗡𝗜𝗖-𝐌𝐃 STARTED NOW...🚀_*"); 
});
