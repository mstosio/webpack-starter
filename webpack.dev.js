const path = require("path");
const common = require("./webpack.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "[name].bundle.js" //generates different hash preveting for cacheing
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"] // those take care of loading css and putting styles into head
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ]
});
