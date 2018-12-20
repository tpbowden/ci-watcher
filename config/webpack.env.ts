import { Configuration } from "webpack";

const prod: Configuration = {
  devtool: "source-map",
  mode: "production"
};

const dev: Configuration = {
  devtool: "cheap-module-eval-source-map",
  mode: "development"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;
