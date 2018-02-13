const path = require('path');
const shared = require('./webpack.shared');

module.exports = {
  ...shared,
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    main: path.resolve(__dirname, '../main.ts'),
  },
};
