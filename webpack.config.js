const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV === "production" ? "prod" : "dev"
const environment = require('./config/webpack.' + env);
const shared = require('./config/webpack.shared');

const main = {
  ...shared,
  ...environment,
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    main: './main.ts',
  },
};

const renderer = {
  ...shared,
  ...environment,
  target: 'electron-renderer',
  entry: {
    renderer: './app/app.tsx',
  },
}

module.exports = [main, renderer];
