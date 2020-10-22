<template>
  <div>
    <router-link
      to="/"
      class="to-home">
      <i class="material-icons">home</i>
    </router-link>
    <!-- vue에 내장되어 있는 컴포넌트를 사용하여 router 기능을 사용한다.
        아래 태그는 등록되어있는 라우터가 경로에 맞는 vue 컴포넌트를 그리는 위치이다.
    -->
    <router-view />
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$router)
    console.log(this.$route)
  }
}
</script>

<style lang="scss">
  // router-link 의 to 속성값이 현재 경로와 동일한 경우 태그에 아래 클래스가 부여된다.
  .to-home.router-link-exact-active{
    display:none;
  }
</style>
