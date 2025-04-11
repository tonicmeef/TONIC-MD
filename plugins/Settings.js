import config from '../config.cjs';

const SettingsCmd = async (m, Matrix) => {
  const botNumber = Matrix.user.id.split(':')[0] + '@s.whatsapp.net';
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;

  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;
  const isAuthorized = isOwner || isBot;

  const args = m.body.startsWith(prefix) 
    ? m.body.slice(prefix.length).trim().split(/ +/)
    : [];
  const cmd = args.shift()?.toLowerCase() || '';

  if (cmd !== 'settings') return;

  if (!isAuthorized) return m.reply('*Only the owner or bot can view settings!*');

  try {
    const configInfo = {
      '🤖 BOT_NAME': config.BOT_NAME || 'EF-PRIME',
      '⚡ PREFIX': config.PREFIX,
      '👑 OWNER_NUMBER': config.OWNER_NUMBER,
      '📝 STATUS_TEXT': config.STATUS_TEXT || 'Not configured',
      '👁️ AUTO_READ': config.AUTO_READ || false,
      '⌨️ AUTO_TYPING': config.AUTO_TYPING || false,
      '🎙️ AUTO_RECORDING': config.AUTO_RECORDING || false,
      '📵 ANTI_CALL': config.ANTI_CALL || false,
      '🔗 ANTILINK': config.ANTILINK || false,
      '🏷️ AUTOSTICKER': config.AUTOSTICKER || false,
      '🗄️ MONGODB_URI': config.MONGODB_URI ? '✓ Connected' : '✗ Not configured',
      '🌐 LANGUAGE': config.LANGUAGE || 'en',
    };

    let settingsMessage = `*⚙️ EF-PRIME BOT SETTINGS ⚙️*\n\n`;
    
    for (const [key, value] of Object.entries(configInfo)) {
      const displayValue = typeof value === 'boolean' 
        ? (value ? '✓ Enabled' : '✗ Disabled') 
        : value;
        
      settingsMessage += `*${key}:* ${displayValue}\n`;
    }

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    settingsMessage += `\n*📊 SYSTEM DIAGNOSTICS*\n`;
    settingsMessage += `*🔋 Node Version:* ${process.version}\n`;
    settingsMessage += `*💻 Platform:* ${process.platform}\n`;
    settingsMessage += `*🧠 Memory Usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n`;
    settingsMessage += `*⏱️ Uptime:* ${hours}h ${minutes}m ${seconds}s\n

⚠️if you want to change settings type the setting u want Example : autoread [off /on]/autostatusreply [ off/on]`;

    return m.reply(settingsMessage);

  } catch (error) {
    console.error('Settings command error:', error);
    return m.reply('*Error fetching settings information!*');
  }
};

export default SettingsCmd;