const path = require("path");
const shared = require("./webpack.shared");

module.exports = {
  ...shared,
  entry: {
    renderer: path.resolve(__dirname, "../src/renderer/renderer.tsx")
  },
  target: "electron-renderer"
};
