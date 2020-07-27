//노드JS에서 제공해주는 path 모듈
const path = require("path");

//웹펙에서 사용할 설정파일 -> 노드js 런타임에서 실행되며 node.js환경에서 돌아가는 파일이다.
module.exports = {
  // webpack.config.js가 실행되면서 처음으로 만나는 진입점
  // 프로젝트가 실행되기 위해서 가장 먼저 실행되야할 파일이 존재하는데 그 파일을 설정 >> 그 파일을 통해 bundle이 이루어지고 프로젝트의 설정들이 진행됨
  // app은 진입점의 별칭
  entry: {
    app: path.join(__dirname, "main.js"), // __dirname 현재 webpack.config.js파일의 위치(현재 파일의 경로)
  },
  // 결과물에 대한 설정
  // webpack.config.js의 위치에 dist라는 폴더를 만들어 결과물을 생성해준다.
  output: {
    filename: "[name].js", // [name] 에는 app 이 들어가게 됨(별칭설정을 해줬기 때문에)
    path: path.join(__dirname, "dist"),
  },
  module: "",
  plugins: "",
};
