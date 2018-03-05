import electron from "electron";
import path from "path";
import url from "url";

let win = null;

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
