const shared = require('./webpack.shared');

module.exports = {
  ...shared,
  target: 'electron-renderer',
  entry: {
    renderer: './app/app.tsx',
  },
};
