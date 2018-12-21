const prod = {
  devtool: "source-map",
  mode: "production"
};

const dev = {
  devtool: "cheap-module-eval-source-map",
  mode: "development"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

module.exports = config;
