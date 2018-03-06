import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import shared from "./webpack.shared";

const config: Configuration = {
  ...shared,
  target: "electron-main",
  node: {
    __dirname: false,
    __filename: false
  },
  entry: {
    main: path.resolve(__dirname, "../src/main/index.ts")
  },
  plugins: [
    ...shared.plugins,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html.ejs"),
      inject: false
    })
  ]
};

export default config;
