//const express = require("express");
//var bodyParser = require("body-parser")
var { Client } = require("discord-rpc");
var keys = require(__dirname+"/config.js");
var server = require("http").createServer();
var io = require("socket.io")(server);
var moment = require("moment");
//var app = express();

const port = 13370;
const rpc = new Client({ transport: "ipc" });

//app.use(bodyParser.urlencoded({ extended: true }));

// function decode(input) { // oh yeah its trash
// 	let str = input.match(/.{1,2}/g);
// 	let out = "";
// 	for (let i=0; i<str.length; i++) {
// 		out += String.fromCharCode(parseInt(str[i], 36));
// 	}
// 	return out;
// }

// app.post("/google-play-music-rpc", function(req, res) {});

var current_song = {}

io.on("connection", function(socket){
	console.log(socket.handshake.address.split(":")[3]+" connected!");

	socket.on("song_change", function(now) {
		let current = now.current;
		delete now.current;

		let json = JSON.stringify(now);
		if (current_song != json) {
			current_song = json;
			now.current = current;
			try {
				let left = [
					parseInt(now.duration.split(":")[0])-parseInt(now.current.split(":")[0]),
					parseInt(now.duration.split(":")[1])-parseInt(now.current.split(":")[1])
				];

				let start = (now.state == "playing")? moment().unix(): null;
				let end = (now.state == "playing")? moment()
					.add(left[0], "m")
					.add(left[1], "s")
					.unix(): null;
				let paused = (now.state == "paused")?
					keys.imageKeys.small: undefined;

				console.log(now.artist+" - "+now.title+" ("+now.album+") ("+left[0]+":"+left[1]+" left, "+now.state+")");

				rpc.setActivity({
					details: "🎵  "+now.title,
					state: "👤  "+now.artist,
					startTimestamp: start,
					endTimestamp: end,
					largeImageKey: keys.imageKeys.large,
					smallImageKey: paused,
					largeImageText: "💿  "+now.album,
					//smallImageText: "💿  "+now.album,
					instance: false,
				});
			} catch(err) { console.log(err); } ;
		}
	});

	socket.on("disconnect", function() {
		console.log(socket.handshake.address.split(":")[3]+" disconnected!");
	});
});

server.listen(port, function() {
	console.log("Socket open at 127.0.0.1:"+port);
});

rpc.on("ready", function() {
	console.log("Connected to Discord! ("+keys.appClientID+")");
});

rpc.login(keys.appClientID).catch(function(err) { console.log(err); });
