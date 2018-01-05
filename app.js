const express = require("express");
const bodyParser = require("body-parser")
const { Client } = require("discord-rpc");
const keys = require(__dirname+"/config.js");
var app = express();

const port = 13370;
const rpc = new Client({ transport: "ipc" });

app.use(bodyParser.urlencoded({ extended: true }));

function decode(input) { // oh yeah its trash
	let str = input.match(/.{1,2}/g);
	let out = "";
	for (let i=0; i<str.length; i++) {
		out += String.fromCharCode(parseInt(str[i], 36));
	}
	return out;
}

app.post("/google-play-music-rpc", function(req, res) {
	try {

		let now = JSON.parse(decode(Object.keys(req.body)[0]));
		console.log(now.artist+" - "+now.title+" ("+now.album+")");

		rpc.setActivity({
			details: "🎵  "+now.title,
			state: "👤  "+now.artist,
			largeImageKey: keys.imageKeys.large,
			smallImageKey: keys.imageKeys.small,
			largeImageText: "💿  "+now.album,
			//smallImageText: "💿  "+now.album,
			instance: false,
		});

	} catch(err) { console.log(err); } ;
});

app.listen(port, function() {
	console.log("Server open at 127.0.0.1:"+port);
});

rpc.on("ready", function() {
	console.log("Connected to Discord! ("+keys.appClientID+")");
});

rpc.login(keys.appClientID).catch(function(err) { console.log(err); });
