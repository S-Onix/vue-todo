// 하나의 컴포넌트로 동작하게됨
<template>
    <h1>{{ msg }}</h1>    
</template>
<script>
export default {
    data () {
        return {
            msg : 'Hello Vue!'
        }
    }
}
</script>
<style scoped>
h1 {
    color: red;
}
</style>