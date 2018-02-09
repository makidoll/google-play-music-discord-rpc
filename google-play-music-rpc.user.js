// ==UserScript==
// @name Google Play Music Discord RPC
// @namespace https://maki.cat
// @grant none
// @author Maki
// @match *://play.google.com/*
// @require https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js
// @icon https://github.com/makixx/google-play-music-discord-rpc/blob/master/images/rpc-cover.png?raw=true
// ==/UserScript==

// function myStupidEncodingThing(str) {
// 	let out = "";
// 	for (let i=0; i<str.length; i++) {
// 		out += ("00"+str.charCodeAt(i).toString(36)).slice(-2);
// 	}
// 	return out;
// }

window.maki = {};
window.maki.interval = null;
window.maki.socket = io("http://127.0.0.1:13370");
window.maki.states = {
	"Play": "paused",
	"Pause": "playing"
} 

window.maki.socket.on("connect", function() {
	window.maki.interval = window.setInterval(function() {
		try {	
			window.maki.socket.emit("song_change", {
				title: document.getElementById("currently-playing-title").textContent,
				artist: document.getElementById("player-artist").textContent,
				album: document.querySelector(".player-album").textContent,
				current: document.getElementById("time_container_current").textContent,
				duration: document.getElementById("time_container_duration").textContent,
				state: window.maki.states[document.getElementById("player-bar-play-pause").title]
			});

			// let xhr = new XMLHttpRequest();
			// xhr.open("POST", "http://127.0.0.1:13370/google-play-music-rpc", true);
			// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			// xhr.send(myStupidEncodingThing(update));
		} catch(err) {}
	}, 1000);
});

window.maki.socket.on("disconnect", function() {
	window.clearInterval(window.maki.interval);
});