const path = require("path");
const common = require("./webpack.config");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "main.[contentHash].bundle.js" //generates different hash preveting for cacheing
  },
  optimization:{
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
        MiniCssExtractPlugin.loader, // uses for Minifies
        "css-loader", 
        "resolve-url-loader", 
        "sass-loader"] 
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css"
    }),
    new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        template: "index.html",
       
      }),
  ]
});
