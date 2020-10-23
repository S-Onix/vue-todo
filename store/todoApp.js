import Vue from 'vue'

import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import _findIndex from 'lodash/findIndex'
import _forEachRight from 'lodash/forEachRight'

import cryptoRandomString from 'crypto-random-string'

export default {
  namespaced: true,
  // 참조관계이면 데이터의 불일치가 발생할수 있으므로 state는 객체 형태가 아닌 함수형태로 만들어준다.
  state: () => ({
    db: null,
    todos: []
  }),
  getters: {
    total (state) {
      return state.todos.length
    },
    activeCount (state) {
      return state.todos.filter(todo => !todo.done).length
    },
    completedCount (state, getters) {
      return getters.total - getters.activeCount
    }
  },
  // context를 꺼내지 않고 바로 접근 가능
  mutations: {
    assignDB (state, db) {
      state.db = db
    },
    createDB (state, payload) {
      state.db.get('todos').push(payload).write()
    },
    updateDB (state, payload) {
      const { todo, value } = payload
      state.db
        .get('todos')
        .find({ id: todo.id })
        .assign(value)
        .write()
    },
    deleteDB (state, todo) {
      state.db
        .get('todos')
        .remove({ id: todo.id })
        .write()
    },
    assignTodos (state, todos) {
      // 일반적인 경우에는 아래와 같은 코드
      // this.todos = newTodos
      // 참조관계가 있을 경우에는 깊은 복사를 통해 데이터를 복사한다.
      state.todos = todos
    },
    pushTodo (state, payload) {
      state.todos.push(payload)
    },
    assignTodo (state, payload) {
      const { foundTodo, value } = payload
      // _assign(payload.foundTodo, payload.value)
      _assign(foundTodo, value)
    },
    deleteTodo (state, payload) {
      // $delete >> vuejs에서 제공하는 API중 하나 [반응형? Data에 저장해진 상태]
      // 1. 반응성을 가진 객체 / 2. 인덱스
      Vue.delete(state.todos, payload)
    },
    updateTodo (state, { todo, key, value }) {
      todo[key] = value
    }

  },
  // context에서 꺼내서 사용해야 한다.
  actions: {
    initDB ({ state, commit }) {
      // 매게변수1 : key(DB명) 지정
      const adapter = new LocalStorage('todo-app')
      commit('assignDB', lowdb(adapter))

      const hasTodos = state.db.has('todos').value() // lodash에서 제공

      if (hasTodos) {
        // 할당하는 코드
        // DB에서 todos를 가져오는 코드
        commit('assignTodos', _cloneDeep(state.db.getState().todos)) // 깊은 복사를 통해 localDB의 데이터 변형을 방지한다
      } else {
        // 초기화 코드
        // local DB 초기화
        // defaults는 lodash에서 제공되는 메소드이다.
        state.db
          .defaults({
            todos: [] // 일종의 Collection(RDMS에서는 table)이라고 생각하면됨
          })
          .write()
      }
    },

    createTodo ({ commit }, payload) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }), // 10자리의 랜덤스트링 생성
        title: payload,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      }
      commit('createDB', newTodo)
      commit('pushTodo', newTodo)
    },

    updateTodo ({ state, commit }, payload) {
      const { todo, value } = payload
      commit('updateDB', { todo, value })
      // 위의 코드와 동일코드
      // commit('updateDB', payload)

      // lodash 의 함수 사용 >> 로컬DB에 있는 데이터를 ID를 기준으로 찾아온다.
      const foundTodo = _find(state.todos, { id: todo.id })
      commit('assignTodo', { foundTodo, value })
    },

    deleteTodo ({ state, commit }, payload) {
      commit('deleteDB', payload)

      // todos 는 배열데이터이기 때문에 반응성을 유지하기 어렵다.
      // 따라서 특정 배열을 갱신해주는 메소드(shift)를 사용해야 반응성을 가질수 있다. 또는 vue에서 제공되는 delete를 사용한다.
      // 인덱스를 찾아오기위한 lodash 함수
      const foundIndex = _findIndex(state.todos, { id: payload.todo.id })
      commit('deleteTodo', foundIndex)
    },

    completeAll ({ state, commit }, payload) {
      /**
       * 1. DB갱신
       * 2. local TODOS 갱신
      */
      const newTodos = state.db
        .get('todos')
        .forEach(todo => {
          commit('updateTodo', { todo, key: 'done', payload })
        })
        .write()

      commit('assignTodos', _cloneDeep(newTodos))
    },
    clearCompleted ({ state, commit, dispatch }) {
      // 배열의 삭제의 경우 앞의 인덱스에서부터 삭제된다면
      // 삭제된 인덱스 위치보다 뒤에 있는 데이터들은 앞으로 땡겨지면서
      // 데이터의 불일치가 발생할 수 있다.
      // 따라서 가장 최적화된 방법은 뒤에서부터 데이터를 제거해 나가는 경우이다.
      // 아래 코드는 앞에서부터 데이터가 삭제되므로 최초 한건에 대해서만 삭제가 되고 이후단은 삭제되지 않는다.
      // this.todos.forEach(todo => {
      //   if (todo.done) {
      //     this.deleteTodo(todo)
      //   }
      // })

      // 뒤에서부터 지우는 로직
      // this.todos.reduce((list, todo, index) => {
      //   if (todo.done) {
      //     list.push(index)
      //   }
      //   return list
      // }, [])
      //   .reverse()
      //   .forEach(index => {
      //     this.deleteTodo(this.todos[index])
      //   })

      // 라이브러리를 이용한 삭제방법
      _forEachRight(state.todos, todo => {
        if (todo.done) {
          dispatch('deleteTodo', todo)
        }
      })
    }
  }
}
