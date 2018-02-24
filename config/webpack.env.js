const prod = {
  devtool: "source-map"
};

const dev = {
  devtool: "cheap-module-eval-source-map"
};

module.exports = process.env.NODE_ENV === "production" ? prod : dev;
