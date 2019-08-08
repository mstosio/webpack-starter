const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {
  entry: {
    index: "./assets/js/index.js" // if u want to add another js file just add new line
  },
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "[name].[contentHash].js" //generates different hash preveting for cacheing
  },
  devServer: {
    contentBase: "./"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"] // those take care of loading css and putting styles into head
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "assets"
            }
          },
        ],
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 8080,
      files: [
        "./*.html",
        "./assets/css/*.css",
        "./assets/js/*.js",
        "./bundle/*.js"
      ],
      server: { baseDir: ["./"] }
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new CleanWebpackPlugin(),
  ]
};
