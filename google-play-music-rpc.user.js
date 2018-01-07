// ==UserScript==
// @name Google Play Music Discord RPC
// @namespace https://maki.cat
// @grant none
// @author Maki
// @match *://play.google.com/*
// ==/UserScript==

function myStupidEncodingThing(str) {
	let out = "";
	for (let i=0; i<str.length; i++) {
		out += ("00"+str.charCodeAt(i).toString(36)).slice(-2);
	}
	return out;
}

setInterval(function() {

	let update = JSON.stringify({
		title: document.querySelector(".now-playing-info-content #currently-playing-title").textContent,
		artist: document.querySelector(".now-playing-info-content .player-artist").textContent,
		album: document.querySelector(".now-playing-info-content .player-album").textContent
	})

	if (window.current_song != update) {
		// Song change
		window.current_song = update;

		let xhr = new XMLHttpRequest();

		xhr.open("POST", "http://127.0.0.1:13370/google-play-music-rpc", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(myStupidEncodingThing(update));
	}

}, 8000);
