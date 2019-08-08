const path = require("path");
const common = require("./webpack.config");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  entry: {
    index: "./src/js/index.js" // if u want to add another js file just add new line
  },
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "main.js" //generates different hash preveting for cacheing
  },
  devServer: {
    contentBase: "./"
  },
});
