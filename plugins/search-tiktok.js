const fetch = require("node-fetch");
const {
  cmd
} = require("../command");
cmd({
  'pattern': "tiktoksearch",
  'alias': ["tiktoks", "tiks"],
  'desc': "Search for TikTok videos using a query.",
  'react': '✅',
  'category': 'tools',
  'filename': __filename
}, async (_0x5d6728, _0x5b3f91, _0x8dc722, {
  from: _0x413f5e,
  args: _0x33ddfe,
  reply: _0x2b8cb3
}) => {
  if (!_0x33ddfe[0x0]) {
    return _0x2b8cb3("🌸 What do you want to search on TikTok?\n\n*Usage Example:*\n.tiktoksearch <query>");
  }
  const _0x36c4a3 = _0x33ddfe.join(" ");
  await _0x8dc722.react('⌛');
  try {
    _0x2b8cb3("🔎 Searching TikTok for: " + _0x36c4a3);
    const _0x29056a = await fetch('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + encodeURIComponent(_0x36c4a3));
    const _0x56ad0e = await _0x29056a.json();
    if (!_0x56ad0e || !_0x56ad0e.data || _0x56ad0e.data.length === 0x0) {
      await _0x8dc722.react('❌');
      return _0x2b8cb3("❌ No results found for your query. Please try with a different keyword.");
    }
    const _0x3df082 = _0x56ad0e.data.slice(0x0, 0x7);
    _0x3df082.sort(() => Math.random() - 0.5);
    for (const _0x1cbfc2 of _0x3df082) {
      const _0x2a89a2 = "🌸 *SubZero TikTok Video Result*:\n\n*• Title*: " + _0x1cbfc2.title + "\n\n*• Author*: " + (_0x1cbfc2.author || 'Unknown') + "\n\n*• Duration*: " + (_0x1cbfc2.duration || "Unknown") + "\n\n*• URL*: " + _0x1cbfc2.link + "\n\n";
      if (_0x1cbfc2.nowm) {
        await _0x5d6728.sendMessage(_0x413f5e, {
          'video': {
            'url': _0x1cbfc2.nowm
          },
          'caption': _0x2a89a2
        }, {
          'quoted': _0x8dc722
        });
      } else {
        _0x2b8cb3("❌ Failed to retrieve video for \"" + _0x1cbfc2.title + "\".");
      }
    }
    await _0x8dc722.react('✅');
  } catch (_0x41a380) {
    console.error("Error in TikTokSearch command:", _0x41a380);
    await _0x8dc722.react('❌');
    _0x2b8cb3("❌ An error occurred while searching TikTok. Please try again later.");
  }
});
