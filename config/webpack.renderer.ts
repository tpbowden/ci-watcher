import { Configuration } from 'webpack';
import path from "path";
import shared from "./webpack.shared";

const config: Configuration = {
  ...shared,
  target: "electron-renderer",
  entry: {
    renderer: path.resolve(__dirname, "../src/renderer/index.tsx")
  }
};

export default config;
