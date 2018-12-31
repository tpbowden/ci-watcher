import crypto from "crypto";
import os from "os";

import { shell } from "electron";
import keytar from "keytar";
import fetch from "node-fetch";

import { PORT, WebServer } from "./WebServer";

const SERVICE_NAME = "CI-WATCHER";
const USER_ACCOUNT = os.userInfo().username;
const OAUTH_URI = process.env.OAUTH_URI;
const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;

export const getToken = async () => {
  const token = await keytar.getPassword(SERVICE_NAME, USER_ACCOUNT);
  if (!token) {
    return null;
  }
  return token;
};

export const saveToken = async (token: string) =>
  keytar.setPassword(SERVICE_NAME, USER_ACCOUNT, token);

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

export const login = async (): Promise<string> => {
  const server = new WebServer();
  const state = await generateState();
  server.start(state);
  shell.openExternal(
    `${OAUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`
  );
  const temporaryToken = await server.getToken();
  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: temporaryToken,
    redirect_uri: REDIRECT_URI,
    state
  };
  const res = await fetch("https://github.com/login/oauth/access_token", {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const { access_token } = await res.json();
  return access_token;
};
