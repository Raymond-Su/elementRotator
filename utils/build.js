const webpack = require("webpack"),
  CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
let config = require("../webpack.config");

console.log("cleaning build folder")
config.plugins = [
  // clean the build folder
  new CleanWebpackPlugin(),
].concat(config.plugins);

console.log("build started")
webpack(config, function(err) {
  if (err) throw err;
  console.log("build succeeded")
});




