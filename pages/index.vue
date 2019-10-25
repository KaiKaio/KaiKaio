<template>
  <div id="home">
    <Header />
    这里是开开的首页
    <nuxt-link to="/SecondPage">二级页面</nuxt-link>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'Home',
  components: {
    Header,
  }
}
</script>

<style>

</style>
