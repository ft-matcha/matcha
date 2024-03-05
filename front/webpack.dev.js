const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    historyApiFallback: {
      index: 'dist/index.html',
    },
    port: 3000,
    hot: true,
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
  },
});
