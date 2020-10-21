<template>
    <div>
        <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @update-todo="updateTodo"
          @delete-todo="deleteTodo"
        />
        <hr/>
        <!-- 이벤트 바인딩된 명칭::자식컴포넌트에서 emit으로 보내준 이름 / 뒤의 값::부모에서 하고 싶은 행위  -->
        <todo-creator @create-todo="createTodo" />
    </div>
</template>
<script>
// 일반적으로 node_modules에서 가져오는 모듈은 상단에 작성한다.
import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import _findIndex from 'lodash/findIndex'

import TodoItem from './TodoItem'
import TodoCreator from './TodoCreator'

export default {
  components: {
    TodoItem,
    TodoCreator
  },

  // lowdb를 통해 local storage 제어가 가능 (lowdb는 모듈로서 설치해야한다)
  // lowdb를 사용하기 위해서는 lodash라는 라이브러리가 필요하다.
  // 반응성을 위해서 return이 가능한 함수형태로 만들어준다.
  // db가 사용되는 장소는 TodoApp에만 한정되어 있는것이 아니므로 미리 선언이 필요하다
  data () {
    return {
      db: null,
      todos: []
    }
  },
  // TodoApp컴포넌트가 생성직후에 created가 실행
  created () {
    this.initDB()
  },
  methods: {
    initDB () {
      // 매게변수1 : key(DB명) 지정
      const adapter = new LocalStorage('todo-app')
      this.db = lowdb(adapter)

      console.log(this.db)

      const hasTodos = this.db.has('todos').value() // lodash에서 제공

      if (hasTodos) {
        // 할당하는 코드
        // DB에서 todos를 가져오는 코드
        this.todos = _cloneDeep(this.db.getState().todos) // 깊은 복사를 통해 localDB의 데이터 변형을 방지한다
      } else {
        // 초기화 코드
        // local DB 초기화
      // defaults는 lodash에서 제공되는 메소드이다.
        this.db
          .defaults({
            todos: [] // 일종의 Collection(RDMS에서는 table)이라고 생각하면됨
          })
          .write()
      }
    },
    createTodo (title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }), // 10자리의 랜덤스트링 생성
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      }

      // Create DB
      this.db
        .get('todos') // lodash에서 제공
        .push(newTodo) // lodash에서 제공
        .write() // lowdb에서 제공

      // Create Client
      this.todos.push(newTodo)
    },
    updateTodo (todo, value) {
      this.db
        .get('todos')
        .find({ id: todo.id })
        .assign(value)
        .write()
      // lodash 의 함수 사용 >> 로컬DB에 있는 데이터를 ID를 기준으로 찾아온다.
      const foundTodo = _find(this.todos, { id: todo.id })
      _assign(foundTodo, value)
    },
    deleteTodo (todo) {
      this.db
        .get('todos')
        .remove({ id: todo.id })
        .write()

      // todos 는 배열데이터이기 때문에 반응성을 유지하기 어렵다.
      // 따라서 특정 배열을 갱신해주는 메소드(shift)를 사용해야 반응성을 가질수 있다. 또는 vue에서 제공되는 delete를 사용한다.
      // 인덱스를 찾아오기위한 lodash 함수
      const foundIndex = _findIndex(this.todos, { id: todo.id })
      // $delete >> vuejs에서 제공하는 API중 하나 [반응형? Data에 저장해진 상태]
      // 1. 반응성을 가진 객체 / 2. 인덱스
      this.$delete(this.todos, foundIndex)
    }
  }
}
</script>
