import { Configuration } from 'webpack';

const prod: Configuration = {
  mode: "production",
  devtool: "source-map"
};

const dev: Configuration = {
  mode: "development",
  devtool: "cheap-module-eval-source-map"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;
