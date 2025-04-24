
const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

const diaryDatabasePath = path.join(__dirname, '../../lib/diarydatabase.json');

cmd({
pattern: "addiary",
react: "📒",
desc: "Add data to diary",
category: "diary",
use: '.adddiary <data>',
filename: __filename
}, async (conn, mek, m, { from, reply, match }) => {
try {
const data = match[1];
if (!data) {
return reply("Please provide data to add to diary");
}

const diaryData = fs.existsSync(diaryDatabasePath) ? JSON.parse(fs.readFileSync(diaryDatabasePath)) : [];

diaryData.push({ data, timestamp: new Date().toISOString() });

fs.writeFileSync(diaryDatabasePath, JSON.stringify(diaryData, null, 2));

reply("Data added to diary successfully!");

} catch (error) {
console.error(error);
reply(`Error adding data to diary: ${error.message}`);
}
});

cmd({
pattern: "showdiary",
react: "📖",
desc: "Show diary data",
category: "diary",
use: '.showdiary',
filename: __filename
}, async (conn, mek, m, { from, reply }) => {
try {
const diaryData = fs.existsSync(diaryDatabasePath) ? JSON.parse(fs.readFileSync(diaryDatabasePath)) : [];

if (diaryData.length === 0) {
  return reply("Diary is empty!");
}

const diaryText = diaryData.map((entry, index) => `${index + 1}. ${entry.data} (Added on ${entry.timestamp})`).join("\n\n");

reply(diaryText);

} catch (error) {
console.error(error);
reply(`Error showing diary data: ${error.message}`);
}
});
