const path = require("path");
const webpack = require("webpack");
const env = require("./webpack.env");
const Dotenv = require("dotenv-webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: "url-loader?limit=100000"
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new Dotenv()
  ],
  resolve: {
    alias: {
      main: path.resolve(__dirname, "../src/main"),
      renderer: path.resolve(__dirname, "../src/renderer")
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  ...env
};
