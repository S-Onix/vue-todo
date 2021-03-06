import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 라우터를 등록하여 페이지 이동이 가능하도록 세팅
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
