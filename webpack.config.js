const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {
  entry: {
    index: "./src/js/index.js",
    vendor: "./src/js/vendor.js" // if u want to add another js file just add new line
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
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[hash].[ext]",
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
        "./src/css/*.css",
        "./src/js/*.js",
        "./bundle/*.js"
      ],
      server: { baseDir: ["./"] }
    }),
    new CleanWebpackPlugin(),
  ]
};
