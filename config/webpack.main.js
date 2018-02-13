const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV === "production" ? "prod" : "dev"
const environment = require('./webpack.' + env);
const shared = require('./webpack.shared');

module.exports = {
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
