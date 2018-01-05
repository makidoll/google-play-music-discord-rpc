# Google Play Music RPC
> 🎧 Show your friends which song you're listening to!

## Installation
- Download **Violentmonkey** from https://violentmonkey.github.io/get-it
- Install **userscript** from (link to userscript)
- Download **Node.js LTS** from https://nodejs.org/en
- Open `INSTALL.bat`
- Open `RUN.bat`

## Config
Config has already been set with my settings. If you want to change the ID's though, they are located in `config.js`

## Issues
- The userscript automatically POSTs (using XMLHttpRequest) when there is a song change, but doing this too often causes the browser to not send the request.