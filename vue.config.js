module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue/" : "/",
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 7000,
        maxSize: 25000,
        automaticNameDelimiter: "-"
      }
    }
  }
};
