import crypto from "crypto";
import os from "os";

import { shell } from "electron";
import keytar from "keytar";

import { PORT, WebServer } from "./WebServer";

const SERVICE_NAME = "CI-WATCHER";
const USER_ACCOUNT = os.userInfo().username;
const OAUTH_URI = "https://github.com/login/oauth/authorize";
const CLIENT_ID = "fd4b13e6fba0960c2460";
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;

export const getToken = async () => {
  const refreshToken = await keytar.getPassword(SERVICE_NAME, USER_ACCOUNT);
  if (!refreshToken) {
    return null;
  }
};

const generateState = async () =>
  new Promise<string>((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString("hex"));
      }
    });
  });

export const login = async () => {
  const server = new WebServer();
  const state = await generateState();
  server.start(state);
  shell.openExternal(
    `${OAUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`
  );
  const token = await server.getToken();
  return token;
};
