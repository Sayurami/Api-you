const config = require('../config')
const { cmd, commands } = require('../command')
const os = require("os")

cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, quoted, reply }) => {

    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        const desc = `* _𝑺𝑬𝑻𝑻𝑰𝑵𝑮𝑺_

╭━━━━━━━★・*｡ﾟ
┣━ 🔧 *WORK MODE*
┃ ┣ ⏺️ *1.1 Public Work*
┃ ┣ 🔒 *1.2 Private Work*
┃ ┣ 👥 *1.3 Group Only*
┃ ┗ 💬 *1.4 Inbox Only*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ 🎤 *AUTO VOICE*
┃ ┣ ✅ *2.1 Voice On*
┃ ┗ ❌ *2.2 Voice Off*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ 👀 *AUTO STATUS SEEN*
┃ ┣ ✅ *3.1 Status Seen On*
┃ ┗ ❌ *3.2 Status Seen Off*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ 🖼️ *AUTO STICKER*
┃ ┣ ✅ *4.1 Sticker On*
┃ ┗ ❌ *4.2 Sticker Off*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ ✉️ *AUTO REPLY*
┃ ┣ ✅ *5.1 Reply On*
┃ ┗ ❌ *5.2 Reply Off*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ 🌐 *BOT ONLINE / OFFLINE*
┃ ┣ ✅ *6.1 Online On*
┃ ┗ ❌ *6.2 Online Off*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ 📖 *MSG READ*
┃ ┣ ✅ *7.1 Read On*
┃ ┗ ❌ *7.2 Read Off*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ ❤️ *MSG REACT*
┃ ┣ ✅ *8.1 React On*
┃ ┗ ❌ *8.2 React Off*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ 🚫 *ANTI LINK*
┃ ┣ ✅ *9.1 Anti Link On*
┃ ┗ ❌ *9.2 Anti Link Off*
╰━━━━━━━━━━━━━━━★

╭━━━━━━━★・*｡ﾟ
┣━ ⚡ *STATUS REACT*
┃ ┣ ✅ *10.1 Status React On*
┃ ┗ ❌ *10.2 Status React Off*
╰━━━━━━━━━━━━━━━★

* *🔢 Reply Below This Number Change To Bot Change Setting(නම්බරෙ රිප්ලයි කරපම් උත්තො*

> *𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 ᴏꜰꜰɪᴄɪᴀʟ Qᴜᴇɴɴ ʙᴜɴɴʏ ᴍᴅ*`;

        const vv = await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/5hd2zv.jpg" },
            caption: desc
        }, { quoted: mek });

        const handler = async (msgUpdate) => {
            const msg = msgUpdate.messages?.[0];
            if (!msg?.message?.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();
            const stanzaId = msg.message.extendedTextMessage.contextInfo?.stanzaId;

            if (stanzaId !== vv.key.id) return;

            switch (selectedOption) {
                case '1.1': reply(".update MODE:public"); break;
                case '1.2': reply(".update MODE:private"); break;
                case '1.3': reply(".update MODE:group"); break;
                case '1.4': reply(".update MODE:inbox"); break;
                case '2.1': reply(".update AUTO_VOICE:true"); break;
                case '2.2': reply(".update AUTO_VOICE:false"); break;
                case '3.1': reply(".update AUTO_READ_STATUS:true"); break;
                case '3.2': reply(".update AUTO_READ_STATUS:false"); break;
                case '4.1': reply(".update AUTO_STICKER:true"); break;
                case '4.2': reply(".update AUTO_STICKER:false"); break;
                case '5.1': reply(".update AUTO_REPLY:true"); break;
                case '5.2': reply(".update AUTO_REPLY:false"); break;
                case '6.1': reply(".update ALLWAYS_OFFLINE:true"); break;
                case '6.2': reply(".update ALLWAYS_OFFLINE:false"); break;
                case '7.1': reply(".update READ_MESSAGE:true"); break;
                case '7.2': reply(".update READ_MESSAGE:false"); break;
                case '8.1': reply(".update AUTO_REACT:true"); break; // 🔧 fixed here
                case '8.2': reply(".update AUTO_REACT:false"); break;
                case '9.1': reply(".update ANTI_LINK:true"); break;
                case '9.2': reply(".update ANTI_LINK:false"); break;
                case '10.1': reply(".update AUTO_REACT_STATUS:true"); break;
                case '10.2': reply(".update AUTO_REACT_STATUS:false"); break;
                default:
                    reply("Invalid option. Please select a valid option🔴");
            }

            conn.ev.off('messages.upsert', handler); // cleanup listener
        };

        conn.ev.on('messages.upsert', handler);

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});









