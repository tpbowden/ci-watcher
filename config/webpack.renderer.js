const path = require('path');
const shared = require('./webpack.shared');

module.exports = {
  ...shared,
  target: 'electron-renderer',
  entry: {
    renderer: path.resolve(__dirname, '../app/app.tsx'),
  },
};
