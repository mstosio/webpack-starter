const path = require("path");
const common = require("./webpack.config");
const merge = require("webpack-merge");

module.exports = merge(common, {
    mode: "production",
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "main.[contentHash].js" //generates different hash preveting for cacheing
  },
  devServer: {
    contentBase: "./"
  },
});
