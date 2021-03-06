<template>
    <div
      :class="{done}"
      class="todo-item"
    >
        <div
          v-if="isEditMode"
          class="item__inner item--edit">

          <input
            ref="titleInput"
            :value="editedTitle"
            type="text"
            @input="editedTitle = $event.target.value"
            @keypress.enter="editedTodo"
            @keypress.esc="offEditMode"
          />

          <div class="item__actions">
            <button
              class="btn btn--primary"
              key="complete"
              @click="editedTodo"
             >
              <i class="material-icons">done</i>
            </button>
            <button
              class="btn"
              key="cancel"
              @click="offEditMode"
            >
              <i class="material-icons">clear</i>
            </button>
          </div>

        </div>

        <div
          v-else
          class="item__inner item--normal">

          <label>
            <input
              v-model="done"
              type="checkbox"
            />
            <span class="icon"><i class="material-icons">check</i></span>
          </label>
          <div class="item__title-wrap">
              <!-- 제목, 타이틀 -->
              <div class="item__title">
                  {{ todo.title }}
              </div>
              <div class="item__date">
                  {{ date }}
              </div>
          </div>
          <div class="item__actions">
              <button
                class="btn"
                key="update"
                @click="onEditMode">
                  <i class="material-icons">edit</i>
              </button>
              <button
                class="btn btn--danger"
                key="delete"
                @click="deleteTodo">
                  <i class="material-icons">delete</i>
              </button>
          </div>
        </div>

    </div>
</template>
<script>
// 날짜관련 라이브러리 momentjs와 동일하게 사용되며 momentjs에 비해 가벼움
import dayjs from 'dayjs'

export default {
  props: {
    todo: Object
  },
  data () {
    return {
      isEditMode: false,
      editedTitle: ''
    }
  },
  computed: {
    // 데이터가 수정되었을때의 데이터가 분기되어야하기때문에 객체 리터럴 형식으로 만든다(함수형태 X)
    done: {
      get () {
        return this.todo.done
      },
      set (done) {
        // DB에 넣는 코드를 작성해야한다.
        this.updateTodo({
          done
        })
      }
    },
    date () {
      const date = dayjs(this.todo.createdAt)
      const isSame = date.isSame(this.todo.updatedAt)
      if (isSame) {
        return date.format('YYYY년 MM월 DD일')
      } else {
        return `${date.format('YYYY년 MM월 DD일')} (edited)`
      }
    }
  },
  methods: {
    editedTodo () {
      if (this.todo.title !== this.editedTitle) {
        this.updateTodo({
          title: this.editedTitle,
          updatedAt: new Date()
        })
      }

      this.offEditMode()
    },
    onEditMode () {
      this.isEditMode = true
      this.editedTitle = this.todo.title

      // 화면 렌더링 이후에 사용가능하도록 하게 하는 코드 (렌더링전에 해당 참조는 사용할수 없으니..)
      // 화면 렌더링 보장 (에로우펑션으로 사용해야 this를 사용가능하다)
      this.$nextTick(() => {
        this.$refs.titleInput.focus()
      })
    },
    offEditMode () {
      this.isEditMode = false
    },
    updateTodo (value) {
      // 부모에게
      this.$store.dispatch('todoApp/updateTodo', {
        todo: this.todo,
        value
      })
    },
    deleteTodo () {
      this.$store.dispatch('todoApp/deleteTodo', this.todo)
    }
  }
}
</script>
<!-- 중첩된 문법을 사용하는 것은 scss의 문법이다 -->
<style lang="scss">
  //@import "../scss/style"
</style>
