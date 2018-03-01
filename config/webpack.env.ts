const prod = {
  mode: "production",
  devtool: "source-map"
};

const dev = {
  mode: "development",
  devtool: "cheap-module-eval-source-map"
};

module.exports = process.env.NODE_ENV === "production" ? prod : dev;
