<template>
  <div id="app" :class="'default'" v-cloak>
    <Main />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { isHideTool, setIsHideTool } = useGlobal()

watch(() => route.name, (routeName) => {
  const hideToolRoute = ['article-article_id']
  const shouldHide = hideToolRoute.includes(routeName as string)
  setIsHideTool(shouldHide)
}, { immediate: true })
</script>
