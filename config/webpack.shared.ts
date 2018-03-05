import path from "path";
import webpack from "webpack";
import env from "./webpack.env";

export default {
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
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  resolve: {
    alias: {
      renderer: path.resolve(__dirname, "../src/renderer"),
      main: path.resolve(__dirname, "../src/main")
    },
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
