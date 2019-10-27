<template>
  <div id="app" v-cloak>
    <MainView />
  </div>
</template>

<script>
import MainView from '@/components/layout/main'

export default {
  name: 'App',
  components: {
    MainView,
  }
}
</script>
