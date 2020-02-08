<template>
  <div id="main-container">
    <Nav />
    <ArticleList />
    <Tool />
  </div>
</template>

<script>
import ArticleList from '@/components/archive/ArticleList'
import Nav from '@/components/archive/Nav'
import Tool from '@/components/archive/Tool'

export default {
  name: 'MainContainer',
  components: {
    ArticleList,
    Nav,
    Tool
  }
}
</script>

<style>
#main-container {
  display: flex;
  justify-content: space-between;
}
</style>
