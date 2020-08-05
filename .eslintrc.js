//바벨을 통해서 eslint 문법을 지원해줄수 있도록 세팅
module.exports = {
  root: true,
  parserOptions: {
    //바벨을 이용하여 eslint를 분석하겠다.
    parser: "babel-eslint",
    //ecma 버전을 명시
    ecmaVersion: 2015,
    //모듈 단위로 분석하겠다.
    sourceType: "module",
  },
  //사전에 정의된 전역변수들을 사용할지 말지 설정하는 변수다.
  env: {
    browser: true,
    node: true,
  },
  //규칙 검사를 위해 어떤 기준으로 할것인지 설정
  extends: [
    "standard",
    "plugin:vue/essential", //plugin으로 설치를 했고 규칙을 조금 가볍게 규칙을 사용하겟다.
  ],
  plugins: ["vue"],
  //extends에 설정된 규칙 중에 제외하고 싶은 규칙들을 설정
  rules: {
    "no-new": 0, // 0 :: 정상 , 1 :: 에러 , 2 :: 주의
  },
};
