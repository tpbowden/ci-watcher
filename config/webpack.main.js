const shared = require('./webpack.shared');

module.exports = {
  ...shared,
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    main: './main.ts',
  },
};
