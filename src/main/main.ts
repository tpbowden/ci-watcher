import electron, { ipcMain } from "electron";
import path from "path";
import url from "url";
import { getToken, login, saveToken } from "./authClient";

let win: Electron.BrowserWindow | null = null;

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

ipcMain.on("get-token", async (event: Electron.Event) => {
  try {
    const token = await getToken();
    event.sender.send("get-token", token);
  } catch (e) {
    event.sender.send("get-token", null);
  }
});

ipcMain.on("handle-login", async (event: Electron.Event) => {
  try {
    const token = await login();
    win!.show();
    event.sender.send("handle-login", token);
    saveToken(token);
  } catch (e) {
    event.sender.send("handle-login", null, new Error("login failed"));
  }
});
