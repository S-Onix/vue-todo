const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
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
      // ... other rules
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        // 두개 이상의 loader가 필요하기 때문에 loader가 아닌 use 속성을 이용한다.
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  // 모듈이 처리된 이후 추후에 어떤작업을 진행해야하는지 배열로 명시해준다.
  // 결과적으로 output으로 전달해준다.
  plugins: [new VueLoaderPlugin()],
};
