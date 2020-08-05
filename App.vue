<template>
  <todo-app/>
</template>

<script>
import TodoApp from './components/TodoApp'

export default {
  components: {
    // 'todo-app' : TodoApp
    // TodoApp : TodoApp
    TodoApp // 위의 내용과 동일함
  }
}

</script>
