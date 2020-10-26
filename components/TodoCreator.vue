<template>
    <div>
        <button>
          <i class="material-icons">add</i>
        </button>
        <input
            :value="title"
            :placeholder="placeholder"
            type="text"
            @input="title = $event.target.value"
            @keypress.enter="createTodo"
        />
    </div>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      placeholder: '할 일을 추가해주세요!'
    }
  },
  methods: {
    createTodo () {
      const validatedTitle = this.title && this.title.trim()
      if (!validatedTitle) {
        alert('유효하지 않는 제목입니다!')
        this.title = this.title.trim()
        return
      }

      this.$store.dispatch('todoApp/createTodo', this.title)
      // this.$emit('create-todo', this.title)
      this.title = ''

      // 화면 렌더링 시간을 기다린 이후 추가된 위치로 focusing을 맞춰준다.
      this.$nextTick(() => {
        // 화면의 위치조정을 위한 코드 (Y축의 스크롤 최대 위치로 이동 (x축은 이동하는게 없음))
        window.scrollTo(0, document.body.scrollHeight)
      })
    }
  }
}
</script>
