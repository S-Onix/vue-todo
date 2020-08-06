<template>
    <div>
        <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="tood"
        />
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

      this.db
        .get('todos') // lodash에서 제공
        .push(newTodo) // lodash에서 제공
        .write() // lowdb에서 제공
    }
  }
}
</script>
