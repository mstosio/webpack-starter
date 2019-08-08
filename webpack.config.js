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
    filename: "main.[contentHash].js" //generates different hash preveting for cacheing
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
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, //url-loader takes care of loading images properly
        use: [
          {
          loader: 'url-loader',
          options: {
            limit: 1000, // if less than 10 kb, add base64 encoded image to css
            publicPath: '/bundle',
            name: "assets/[hash].[ext]" // if more than 10 kb move to this folder in build using file-loader
          }
        }]
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
