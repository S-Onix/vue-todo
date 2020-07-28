const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    app: path.join(__dirname, "main.js"),
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
    ],
  },
  // 모듈이 처리된 이후 추후에 어떤작업을 진행해야하는지 배열로 명시해준다.
  // 결과적으로 output으로 전달해준다.
  plugins: [new VueLoaderPlugin()],
};
