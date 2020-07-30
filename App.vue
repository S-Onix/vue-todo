<template>
    <div>
        <span class="span-test">
            테스트입니다
        </span>
        <span>
            크기 비교
        </span>
        <h1>{{ msg }}</h1>
    </div>
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
.span-test {
    color: blue;
    font-size: 50%;
}
</style>