var path = require('path');
var url = require('url');
var electron = require('electron');

var win = null;

electron.app.on('ready', () => {
  win = new electron.BrowserWindow();
  win.loadURL(url.format({
    pathname: path.join(__dirname, "./index.dev.html"),
    protocol: "file:",
    slashes: true,
  }));
});
