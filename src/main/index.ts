import electron, { ipcMain } from "electron";
import path from "path";
import url from "url";
import { getToken } from "./authClient";

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

ipcMain.on("get-token", async (event: any) => {
  const token = await getToken();
  event.sender.send("get-token", token);
});
