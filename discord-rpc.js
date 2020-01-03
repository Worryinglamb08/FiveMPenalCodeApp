const client = require("discord-rich-presence")("662614114715303947");

function discord() {
  console.log("started rpc");
  client.updatePresence({
    state: "Looking for some penal codes.",
    details: "Maritime Freeroam and RP",
    largeImageKey: "maritime",
    largeImageText: "Maritime Freeroam and RP",
  });
}

module.exports = discord;
