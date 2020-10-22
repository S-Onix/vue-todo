'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
require('@babel/polyfill')

module.exports = {
  // 확장자 생략하고 하는 것들 명시
  resolve: {
    extensions: ['.vue', '.js'],
    // alias를 통해 경로를 수정하여 프로그램상 오류를 줄인다. 가급적 css, js의 alias는 다르게 설정하는것이 관리하기 용이하다
    alias: {
      '~': path.join(__dirname),
      'scss': path.join(__dirname, './scss')
    }
  },
  entry: {
    app: ['@babel/polyfill', path.join(__dirname, 'main.js')]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  // webpack의 중간 처리과정에서 동작된다.
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // index.html의 경로를 작성
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new CopyPlugin(
      /* {
      patterns: [
        {
          from: "assets",
          to: "",
        },
      ],
    } */
      [
        {
          from: 'assets',
          to: ''
        }
      ]
    )
  ]
}
