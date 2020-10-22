import Vue from 'vue'
import Vuex from 'vuex'

import todoApp from './todoApp'

Vue.use(Vuex)
export default new Vuex.Store({
  // 배포시에는 성능상 이슈가 될수 있음 따라서 배포시에는 false로 세팅되어야함
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    todoApp
  }
})
