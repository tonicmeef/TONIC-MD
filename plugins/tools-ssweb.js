// Want My Code ?
// Give Credits To Mr Frank
//wa.me/18062212660

const axios = require("axios");
const {
  cmd
} = require("../command");
const _0x39ffcf = {};
function _0x1abbfc(_0x345477, _0x38b3e4, _0x299417, _0x303965, _0x3b2761) {
  return _0x513e(_0x38b3e4 + 0x3c7, _0x299417);
}
function _0x135e8f(_0x337ccc, _0x543171, _0x519974, _0x3765cd, _0x21fe37) {
  return _0x513e(_0x337ccc + 0x26f, _0x3765cd);
}
_0x39ffcf.pattern = 'ss';
function _0x55748(_0x3585a4, _0x192916, _0x5595bc, _0x51114d, _0x4d13f4) {
  return _0x513e(_0x4d13f4 - 0x4d, _0x3585a4);
}
_0x39ffcf.alias = ["ssweb"];
_0x39ffcf.react = '🪄';
_0x39ffcf.desc = "Download ss of a given link.";
function _0x5099ec(_0x4c0352, _0x19f1b7, _0x105397, _0x34fb2a, _0x40235d) {
  return _0x513e(_0x40235d - 0xb2, _0x105397);
}
_0x39ffcf.category = "other";
function _0x433425(_0x35ba23, _0x5a1328, _0x39db0b, _0x159bed, _0x59c574) {
  return _0x513e(_0x5a1328 + 0x1bd, _0x59c574);
}
_0x39ffcf.use = ".ss <link>";
_0x39ffcf.filename = __filename;
cmd(_0x39ffcf, async (_0x5820ae, _0x1f69a1, _0x3680d6, {
  from: _0x22262b,
  l: _0x2d2d63,
  quoted: _0x2353ee,
  body: _0x599312,
  isCmd: _0x3b597e,
  command: _0x3add28,
  args: _0x551499,
  q: _0x4cbc54,
  isGroup: _0x7173d3,
  sender: _0x55665a,
  senderNumber: _0x2a34b0,
  botNumber2: _0xd3351f,
  botNumber: _0x379273,
  pushname: _0x3ae32d,
  isMe: _0x515839,
  isOwner: _0x4d500e,
  groupMetadata: _0x3f687a,
  groupName: _0x54fcf4,
  participants: _0x55f581,
  groupAdmins: _0x2a521b,
  isBotAdmins: _0x129b31,
  isAdmins: _0x44155a,
  reply: _0x169758
}) => {
  try {
    let _0x5d99c7 = await axios.get("https://api.davidcyriltech.my.id/ssweb?url=" + _0x4cbc54);
    const _0x270eaa = {
      url: _0x5d99c7.data.screenshotUrl
    };
    const _0x5c238c = {
      image: _0x270eaa,//dont touch below u dont wanna regret
      caption: "*`TONIC-MD SCREENSHOT WEBSITE`*\n\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Tᴏɴɪᴄ Tᴇᴄʜ Iɴᴄ.♡*"
    };
    const _0x5ab83d = {
      quoted: _0x1f69a1
    };
    await _0x5820ae.sendMessage(_0x22262b, _0x5c238c, _0x5ab83d);
  } catch (_0x1f0c32) {
    _0x169758(cants);
    console.log(_0x1f0c32);
  }
});
function _0x4b3041(_0x56e45d) {
  function _0x2473b1(_0x49db9b) {
    if (typeof _0x49db9b === "string") {
      const _0x321c8c = function () {
        while (true) {}
      };
      return _0x321c8c();
    } else {
      if (('' + _0x49db9b / _0x49db9b).length !== 1 || _0x49db9b % 20 === 0) {
        debugger;
      } else {
        debugger;
      }
    }
    _0x2473b1(++_0x49db9b);
  }
  try {
    if (_0x56e45d) {
      return _0x2473b1;
    } else {
      _0x2473b1(0);
    }
  } catch (_0x3f8cc9) {}
}

