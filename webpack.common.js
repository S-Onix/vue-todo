"use strict";
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
require("@babel/polyfill");

module.exports = {
  entry: {
    app: ["@babel/polyfill", path.join(__dirname, "main.js")],
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
  },
  // webpack의 중간 처리과정에서 동작된다.
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // index.html의 경로를 작성
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    new CopyPlugin(
      /*{
      patterns: [
        {
          from: "assets",
          to: "",
        },
      ],
    }*/
      [
        {
          from: "assets",
          to: "",
        },
      ]
    ),
  ],
};
