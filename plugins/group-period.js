const config = require("../config");
const { cmd } = require("../command");

// Command to open the group for a specified time
cmd({
  pattern: "opentime",
  react: '🔖',
  desc: "Open the group for a specified time.",
  category: "group",
  use: ".opentime <time> <unit>",
  filename: __filename
}, async (client, message, args, { from, reply, isGroup, isAdmins }) => {
  try {
    if (!isGroup) return reply("This command is only for groups.");
    if (!isAdmins) return reply("You must be an admin to use this command.");

    const [time, unit] = args;
    if (!time || !unit) return reply("Usage: .opentime <time> <unit>\nExample: .opentime 10 second");

    let duration;
    switch (unit) {
      case "second":
        duration = time * 1000;
        break;
      case "minute":
        duration = time * 60000;
        break;
      case "hour":
        duration = time * 3600000;
        break;
      case "day":
        duration = time * 86400000;
        break;
      default:
        return reply("Invalid unit. Use: second, minute, hour, or day.");
    }

    reply(`Group will open for ${time} ${unit}(s) starting now.`);
    setTimeout(async () => {
      await client.groupSettingUpdate(from, "not_announcement");
      reply("> *🔔 Group Chat Automatically Opened By SubZero Bot*");
    }, duration);

    await client.sendMessage(from, {
      react: { text: '✅', key: message.key }
    });
  } catch (error) {
    console.error("Error in opentime command:", error);
    reply("An error occurred. Please try again.");
  }
});

// Command to close the group for a specified time
cmd({
  pattern: "closetime",
  react: '🔖',
  desc: "Close the group for a specified time.",
  category: "group",
  use: ".closetime <time> <unit>",
  filename: __filename
}, async (client, message, args, { from, reply, isGroup, isAdmins }) => {
  try {
    if (!isGroup) return reply("This command is only for groups.");
    if (!isAdmins) return reply("You must be an admin to use this command.");

    const [time, unit] = args;
    if (!time || !unit) return reply("Usage: .closetime <time> <unit>\nExample: .closetime 10 second");

    let duration;
    switch (unit) {
      case "second":
        duration = time * 1000;
        break;
      case "minute":
        duration = time * 60000;
        break;
      case "hour":
        duration = time * 3600000;
        break;
      case "day":
        duration = time * 86400000;
        break;
      default:
        return reply("Invalid unit. Use: second, minute, hour, or day.");
    }

    reply(`Group will close for ${time} ${unit}(s) starting now.`);
    setTimeout(async () => {
      await client.groupSettingUpdate(from, "announcement");
      reply("> *🔕 Group Chat Automatically Closed By SubZero Bot*");
    }, duration);

    await client.sendMessage(from, {
      react: { text: '✅', key: message.key }
    });
  } catch (error) {
    console.error("Error in closetime command:", error);
    reply("An error occurred. Please try again.");
  }
});

// Command to tag all admins in the group
cmd({
  pattern: "tagadmin",
  alias: ["tagadmins"],
  react: '🙀',
  desc: "Tag all admins in the group.",
  category: "group",
  filename: __filename
}, async (client, message, args, { from, reply, isGroup, isAdmins, groupAdmins }) => {
  try {
    if (!isGroup) return reply("This command is only for groups.");
    if (!isAdmins) return reply("You must be an admin to use this command.");
    if (groupAdmins.length === 0) return reply("There are no admins in this group.");

    let adminList = "*TAGGING ALL ADMINS IN THE GROUP 🔳:*\n\n";
    groupAdmins.forEach(admin => {
      adminList += `@${admin.split('@')[0]}\n`;
    });

    await client.sendMessage(from, {
      text: adminList,
      mentions: groupAdmins
    }, { quoted: message });
  } catch (error) {
    console.error("Error in tagadmin command:", error);
    reply("An error occurred while tagging admins.");
  }
});

// Command to mute the group
cmd({
  pattern: "mute",
  alias: ["lock"],
  react: '🔒',
  desc: "Mute the group.",
  category: "group",
  filename: __filename
}, async (client, message, args, { from, reply, isGroup, isAdmins, isBotAdmins }) => {
  try {
    if (!isGroup) return reply("This command is only for groups.");
    if (!isAdmins) return reply("You must be an admin to use this command.");
    if (!isBotAdmins) return reply("Bot must be an admin to use this command.");

    await client.groupSettingUpdate(from, "announcement");
    await reply("*GROUP CHAT MUTED BY SUBZERO-MD* 🔒");
  } catch (error) {
    console.error("Error in mute command:", error);
    reply("An error occurred while muting the group.");
  }
});

// Command to unmute the group
cmd({
  pattern: "unmute",
  alias: ["unlock"],
  react: '🔓',
  desc: "Unmute the group.",
  category: "group",
  filename: __filename
}, async (client, message, args, { from, reply, isGroup, isAdmins, isBotAdmins }) => {
  try {
    if (!isGroup) return reply("This command is only for groups.");
    if (!isAdmins) return reply("You must be an admin to use this command.");
    if (!isBotAdmins) return reply("Bot must be an admin to use this command.");

    await client.groupSettingUpdate(from, "not_announcement");
    await reply("*GROUP CHAT UNMUTED BY SUBZERO-MD* 🔓");
  } catch (error) {
    console.error("Error in unmute command:", error);
    reply("An error occurred while unmuting the group.");
  }
});

// Command to add a user to the group
cmd({
  pattern: "add",
  alias: ["aja"],
  react: '➕',
  desc: "Add a user to the group.",
  category: "group",
  use: "<number>",
  filename: __filename
}, async (client, message, args, { from, reply, isGroup, isBotAdmins, q }) => {
  try {
    if (!isGroup) return reply("This command is only for groups.");
    if (!isBotAdmins) return reply("Bot must be an admin to add users.");
    if (!q || isNaN(q)) return reply("Please provide a valid phone number.");

    const userJid = `${q}@s.whatsapp.net`;
    await client.groupParticipantsUpdate(from, [userJid], "add");
    reply(`User ${q} has been added to the group.`);
  } catch (error) {
    console.error("Error in add command:", error);
    reply("An error occurred while adding the user.");
  }
});

// Command to set a goodbye message
cmd({
  pattern: "setgoodbye",
  react: '👋',
  desc: "Set a goodbye message for the group.",
  category: "group",
  filename: __filename
}, async (client, message, args, { from, reply, isGroup, isAdmins, isBotAdmins, q }) => {
  try {
    if (!isGroup) return reply("This command is only for groups.");
    if (!isAdmins) return reply("You must be an admin to use this command.");
    if (!isBotAdmins) return reply("Bot must be an admin to use this command.");
    if (!q) return reply("Please provide a goodbye message.");

    await client.sendMessage(from, {
      image: { url: config.ALIVE_IMG },
      caption: q
    });
    reply("Goodbye message has been set.");
  } catch (error) {
    console.error("Error in setgoodbye command:", error);
    reply("An error occurred while setting the goodbye message.");
  }
});

// Command to set a welcome message
cmd({
  pattern: "setwelcome",
  react: '👋',
  desc: "Set a welcome message for the group.",
  category: "group",
  filename: __filename
}, async (client, message, args, { from, reply, isGroup, isAdmins, isBotAdmins, q }) => {
  try {
    if (!isGroup) return reply("This command is only for groups.");
    if (!isAdmins) return reply("You must be an admin to use this command.");
    if (!isBotAdmins) return reply("Bot must be an admin to use this command.");
    if (!q) return reply("Please provide a welcome message.");

    await client.sendMessage(from, {
      image: { url: config.ALIVE_IMG },
      caption: q
    });
    reply("Welcome message has been set.");
  } catch (error) {
    console.error("Error in setwelcome command:", error);
    reply("An error occurred while setting the welcome message.");
  }
});
