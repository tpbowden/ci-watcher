import path from "path";
import webpack, { Configuration } from "webpack";
import env from "./webpack.env";

const config: Configuration = {
  module: {
    rules: [
      {
        exclude: path.resolve(__dirname, "../node_modules"),
        test: /\.tsx?$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        loader: "url-loader?limit=100000",
        test: /\.(png|woff|woff2|eot|ttf|svg)$/
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
    })
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

export default config;
