module.exports = (api) => {
  api.cache(true);
  return {
    exclude: ["node_modules"],
    presets: ["@babel/react", "@babel/typescript"]
  };
};
