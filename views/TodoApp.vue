<template>
    <div class="todo-app">
        <div class="todo-app__actions">
          <div class="filters">
            <router-link
              to="all"
              tag="button"
            >
              모든항목 ({{ total }})
            </router-link>
            <router-link
              to="active"
              tag="button"
            >
              해야 할 항목 ({{ activeCount }})
            </router-link>
            <router-link
              to="completed"
              tag="button"
            >
              완료된 항목 ({{ completedCount }})
            </router-link>
          </div>

          <div class="actions clearfix">
            <div class="float--left">
              <label>
                <input
                  v-model="allDone"
                  type="checkbox">
                <span class="icon"><i class="material-icons">done_all</i></span>
              </label>
            </div>

            <div class="float--right clearfix">
              <button
                class="btn float--left"
                @click="scrollToTop"
                >
                <i class="material-icons">keyboard_arrow_up</i>
              </button>
              <button
                class="btn float--left"
                @click="scrollToBottom"
              >
                <i class="material-icons">keyboard_arrow_down</i>
              </button>

              <button
                class="btn btn--danger float--left"
                @click="clearCompleted">
                <i class="material-icons">delete_sweep</i>
              </button>
            </div>

          </div>

        </div>
        <div class="todo-app__list">
          <todo-item
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            @update-todo="updateTodo"
            @delete-todo="deleteTodo"
          />
        </div>

        <!-- 이벤트 바인딩된 명칭::자식컴포넌트에서 emit으로 보내준 이름 / 뒤의 값::부모에서 하고 싶은 행위  -->
        <todo-creator
          class="todo-app__creator"
          @create-todo="createTodo" />
    </div>
</template>
<script>
import scrollTo from 'scroll-to'

import TodoItem from '~/components/TodoItem'
import TodoCreator from '~/components/TodoCreator'

export default {
  components: {
    TodoItem,
    TodoCreator
  },

  // lowdb를 통해 local storage 제어가 가능 (lowdb는 모듈로서 설치해야한다)
  // lowdb를 사용하기 위해서는 lodash라는 라이브러리가 필요하다.
  // 반응성을 위해서 return이 가능한 함수형태로 만들어준다.
  // db가 사용되는 장소는 TodoApp에만 한정되어 있는것이 아니므로 미리 선언이 필요하다
  computed: {
    filteredTodos () {
      switch (this.$route.params.id) {
        case 'all' :
        default :
          return this.todos
        case 'active' :
          return this.todos.filter(todo => !todo.done)
        case 'completed' :
          return this.todos.filter(todo => todo.done)
      }
    },

    allDone: {
      get () {
        return this.total === this.completedCount && this.total > 0
      },
      set (checked) {
        this.completeAll(checked)
      }
    }
  },
  // TodoApp컴포넌트가 생성직후에 created가 실행
  created () {
    this.initDB()
  },
  methods: {
    scrollToTop () {
      scrollTo(0, 0, {
        ease: 'linear'
      })
    },
    scrollToBottom () {
      scrollTo(0, document.body.scrollHeight, {
        ease: 'linear',
        duration: 2000
      })
    }

  }
}
</script>
<style lang="scss">
  @import "scss/style";

  .filters button.router-link-active {
    background: royalblue;
    color: white;
  }

</style>
