const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // index.html의 경로를 작성
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    new CopyPlugin({
      /* 구버전
       [{
        from: 'assets/',
        to:''
      }]
      */
      /**
       * 신버전
       */
      patterns: [
        {
          from: "assets",
          to: "",
        },
      ],
    }),
    //빌드할때마다 삭제하고 시작함
    new CleanWebpackPlugin(),
  ],
  devServer: {
    open: false, // npm run dev 가 실행될때 브라우저가 바로 열리게끔 하겠다
    hot: true, // hot module replacement :: HMR 수정사항이 바로 반영이 되서 브라우저에서 확인이 가능하게 하는 설정
  },
};
