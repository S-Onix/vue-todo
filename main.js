import Vue from "vue";
import App from "./App.vue";

new Vue({
  el: "#app",
  //createElement는 콜백함수
  //render(createElement) {
  //아래의 콜백함수는 최상위 컴포넌트를 인수로 받는다
  //return createElement(App);
  //},
  render: (h) => h(App),
});
