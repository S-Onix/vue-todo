import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '~/views/Home'
import About from '~/views/About'
import TodoApp from '~/views/TodoApp'

Vue.use(VueRouter)

// 접근하고자 하는 페이지(vue)에 대한 정보를 등록해야한다.
// router에 등록된 컴포넌트를 경로에 따라 접근 가능하도록 등록해야한다.
// path : 도메인 경로
// component : 렌더링하고자하는 페이지
const routes = [
  // config
  {
    name: 'index',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'todos',
    path: '/todos',
    redirect: '/todos/all',
    component: TodoApp,
    children: [
      {
        name: 'todos-filter',
        path: ':id'
      }
    ]
  }

]

export default new VueRouter({
  routes
})
