const prod = {
  mode: "production",
  devtool: "source-map"
};

const dev = {
  mode: "development",
  devtool: "cheap-module-eval-source-map"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;
