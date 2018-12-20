module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["@babel/react", "@babel/typescript"]
  };
};
