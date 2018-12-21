import os from "os";

import keytar from "keytar";

const SERVICE_NAME = "CI-WATCHER";
const USER_ACCOUNT = os.userInfo().username;

export const getToken = async () =>
  keytar.getPassword(SERVICE_NAME, USER_ACCOUNT);
