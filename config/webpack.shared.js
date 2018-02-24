const path = require("path");
const webpack = require("webpack");
const env = require("./webpack.env");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist")
  },
  ...env
};
