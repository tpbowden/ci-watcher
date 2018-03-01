import path from "path";
import shared from "./webpack.shared";

export default {
  ...shared,
  target: "electron-main",
  node: {
    __dirname: false,
    __filename: false
  },
  entry: {
    main: path.resolve(__dirname, "../main.ts")
  }
};
