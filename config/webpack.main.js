const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");

const shared = require("./webpack.shared");

module.exports = {
  ...shared,
  entry: {
    main: path.resolve(__dirname, "../src/main/main.ts")
  },
  externals: [webpackNodeExternals()],
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    ...shared.plugins,
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, "../index.html.ejs")
    })
  ],
  target: "electron-main"
};
