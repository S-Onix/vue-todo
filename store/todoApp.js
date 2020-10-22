import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import _cloneDeep from 'lodash/cloneDeep'

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
    assignTodos (state, todos) {
      state.todos = todos
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
    }
  }
}
