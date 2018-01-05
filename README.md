# Google Play Music Discord RPC
> 🎧 Show your Discord friends which song you're listening to!

![Preview](https://raw.githubusercontent.com/makixx/google-play-music-rpc/master/images/screenshot.jpg)

## Installation
- Download **Violentmonkey** from
https://violentmonkey.github.io/get-it
- Install **userscript** from
https://raw.githubusercontent.com/makixx/google-play-music-discord-rpc/master/google-play-music-rpc.user.js
- Download **Node.js LTS** from
https://nodejs.org/en
- Download and unzip my script from
https://github.com/makixx/google-play-music-discord-rpc/archive/master.zip
- Open `INSTALL.bat`
- Open `RUN.bat`

## Config
Config has already been set with my settings. If you want to change the ID's though, they are located in `config.js`

## Issues
- The userscript automatically POSTs (using XMLHttpRequest) when there is a song change, but doing this too often causes the browser to not send the request.