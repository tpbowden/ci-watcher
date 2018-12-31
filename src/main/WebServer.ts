import http from "http";
import net from "net";

import express from "express";

export const PORT = 63528;

export class WebServer {
  private server?: net.Server;

  private response?: Promise<string>;

  public start(state: string) {
    if (this.server) {
      throw new Error("Server already listening");
    }
    this.response = new Promise<string>((resolve, reject) => {
      const app = express();
      app.get("/callback", (req, res) => {
        if (req.query.error) {
          reject(new Error(req.query.error));
        } else if (req.query.state !== state) {
          reject(new Error("State mismatch"));
        } else {
          resolve(req.query.code);
        }
        res.end(`
        <html>
          <head>CI Watcher Authentication</head>
          <body onload="window.open('', '_self', '');window.close()">
            This window should close automatically. If not, please close it now.
          </body>
        </html>
        `);
      });
      const server = http.createServer(app).listen(PORT, "127.0.0.1");
      this.server = server;
    });
  }

  public async getToken() {
    if (!this.response || !this.server) {
      throw new Error("Server is not waiting for a token");
    }
    const token = await this.response;
    this.server.close();
    return token;
  }
}
