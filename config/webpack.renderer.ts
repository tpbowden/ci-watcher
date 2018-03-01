import path from "path";
import shared from "./webpack.shared";

export default {
  ...shared,
  target: "electron-renderer",
  entry: {
    renderer: path.resolve(__dirname, "../app/app.tsx")
  }
};
