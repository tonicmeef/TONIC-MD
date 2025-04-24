const { cmd, commands } = require('../command');
const fs = require('fs');

cmd({
    pattern: "vcf",
    react: "📒",
    desc: "Generate a VCF file of group contacts with WhatsApp names",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, isBotAdmins, isAdmins, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isOwner3, dev, groupMetadata, participants }) => {
    
    try {
    if (!isGroup) return m.reply("*🚫 ᴛʜs ᴄᴏᴍᴍᴀɴᴅ ᴡᴏʀᴋs ᴏɴʟʏ ɪɴ ɢʀᴏᴜᴘs!*");
    if (!isAdmins) return m.reply("*🚫 sᴏʀʀʏ ᴏɴʟʏ ᴀᴅᴍɪɴs ᴄɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*")
    if (!isBotAdmins) return m.reply("🚫 ɪ ɴᴇᴇᴅ ᴛᴏ ʙᴇ ᴀᴅᴍɪɴ ᴛᴏ ᴘᴇʀꜰᴏᴍ ᴛʜɪꜱ ᴛᴀꜱᴋ")

    // Notify user that the contact file is being prepared
    await m.reply("*ᴛᴏɴɪᴄ-ᴍᴅ ᴄᴏᴍᴘʟɪɴɢ ᴄᴏɴᴛᴀᴄᴛs*");

        // Fetch group metadata
        const groupMetadata = await conn.groupMetadata(m.chat);
        if (!groupMetadata || !groupMetadata.participants.length) {
            return await m.reply("*ɴᴏ ᴍᴇᴍʙᴇʀs ғᴏᴜɴᴅ ɪɴ ᴛʜɪs ɢʀᴏᴜᴘ.*");
        }

        let vcfContent = "";
        const groupName = groupMetadata.subject;

        // Generate VCF content for each participant
        for (const participant of groupMetadata.participants) {
            try {
                const name = participant.id.split("@")[0];
                const phone = participant.id.split("@")[0];

                // Append the contact information to the VCF content
                vcfContent += `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:+${phone}
END:VCARD
`;
        } catch (e) {
                console.log(`Error processing participant ${participant.id}:`, e);
              m.reply(`${e}`)         
}
      }

        // Ensure that VCF content is not empty
        if (!vcfContent.trim()) {
            return await m.reply("*ᴜɴᴀʙʟᴇ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ᴠᴄғ. ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ.*");
        }

        // Save the VCF content to a file
        const vcfFilePath = `./${groupName}.vcf`;
        fs.writeFileSync(vcfFilePath, vcfContent);

        // Send the file
        await conn.sendMessage(m.chat, {
            document: { url: vcfFilePath },
            mimetype: "text/x-vcard",
            fileName: `${groupName}.vcf`,
        });

        // Optional cleanup after sending the file
        fs.unlinkSync(vcfFilePath);

    } catch (error) {
        console.error("An error occurred:", error);
        await m.reply("*An error occurred while generating the contact file. Please try again.*");
    }
});
