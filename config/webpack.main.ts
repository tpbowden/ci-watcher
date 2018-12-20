import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
import shared from "./webpack.shared";

const config: Configuration = {
  ...shared,
  entry: {
    main: path.resolve(__dirname, "../src/main/index.ts")
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    ...shared.plugins!,
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, "../index.html.ejs")
    })
  ],
  target: "electron-main"
};

export default config;
