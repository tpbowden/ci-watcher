import path from "path";
import url from "url";
import electron from "electron";

var win = null;

electron.app.on("ready", () => {
  win = new electron.BrowserWindow();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `./index.html`),
      protocol: "file:",
      slashes: true
    })
  );
});
