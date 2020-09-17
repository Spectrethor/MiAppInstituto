const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    loginapp: "./frontend/login/JS/login.js",
    adminapp: "./frontend/login/JS/admin.js",
  },
  output: {
    path: path.join(__dirname, "backend/dist/views/JS"),
    filename: "[name].bundle.js",
  },
  devServer: {
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/login/frm_login.html",
      chunks: ["loginapp"],
    }),
    new HtmlWebpackPlugin({
      filename: "admin.html",
      template: "./frontend/login/Modulo_Admin.html",
      chunks: ["adminapp"],
    }),
  ],
};
