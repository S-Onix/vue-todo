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
          />
        </div>

        <!-- 이벤트 바인딩된 명칭::자식컴포넌트에서 emit으로 보내준 이름 / 뒤의 값::부모에서 하고 싶은 행위  -->
        <todo-creator class="todo-app__creator"/>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
    // ...mapState, ...mapGetters를 Helpers 라고 부른다.
    // helpers는 computed에서 선언하여 사용한다.

    // 자바스크립트의 스프레드 문법(전개 연산자) (특정 매개변수만 가져오는것이 아닌 다양한 형태로 가져옴)
    // mapState를 실행했을때의 결과물들을 안에 담아주는 함수
    // 첫번째 파라미터는 문자열 (가져오고자 하는 store의 nameSpace선언)
    // 두번째 파라미터는 배열이고, 그 안의 내용은 store의 state에서 선언한 변수들을 의미한다.
    // 아래 todos()와 동일한 의미를 가진다
    // nameSpace에 있는 state의 변수를 가져다가 사용하겠다.
    ...mapState('todoApp', [
      'todos',
      'filter'
    ]),

    // todos () {
    //   return this.$store.state.todoApp.todos
    // },

    // 첫번째 파라미터는 문자열 (가져오고자 하는 store의 nameSpace선언)
    // 두번째 파라미터는 배열이고, 그 안의 내용은 store의 getters에서 선언한 메소드의 이름들을 의미한다.
    // 아래 total, activeCount, completedCount와 동일한 의미를 가진다.
    ...mapGetters('todoApp', [
      'filteredTodos',
      'total',
      'activeCount',
      'completedCount'
    ]),

    // total () {
    //   return this.$store.getters.todoApp.total
    // },
    // activeCount () {
    //   return this.$store.getters.todoApp.activeCount
    // },
    // completedCount () {
    //   return this.$store.getters.todoApp.completedCount
    // },

    allDone: {
      get () {
        return this.total === this.completedCount && this.total > 0
      },
      set (checked) {
        this.completeAll(checked)
      }
    }

  },
  watch: {
    $route () {
      // this.$store.commit('todoApp/updateFilter', this.$route.params.id)
      // ...mapMutations 에 등록된 메소드 사용시 첫번째 인자는 payload(store > mutations > 해당메소드의 두번째 인자)로 들어가게된다.
      this.updateFilter(this.$route.params.id)
    }
  },
  // TodoApp컴포넌트가 생성직후에 created가 실행
  created () {
    this.initDB()
  },
  methods: {
    // store의 Mutations 접근
    // updateTodo () {
    //   this.$store.commit('todoApp/updateTodo')
    // },
    ...mapMutations('todoApp', [
      'updateFilter'
    ]),

    // store의 Actions에 접근
    // initDB () {
    //   this.$store.dispatch('todoApp/initDB')
    // },
    ...mapActions('todoApp', [
      'initDB',
      'completeAll',
      'clearCompleted'
    ]),

    // index.js에서 Actions를 가져올때에는 앞에 인자가 필요없다.
    ...mapActions([
      'testFunction'
    ]),

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
