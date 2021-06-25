<template>
  <div id="app" v-cloak>
    <MainView />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MainView from '@/components/layout/main'

export default {
  name: 'App',
  components: {
    MainView,
  },
  computed: {
    ...mapState({
      isHideTool: state => state.Global.isHideTool,
    }),
  },

  methods: {
    ...mapActions({
      setIsHideToolAction: 'Global/setIsHideToolAction'
    })
  },

  watch: {
    $route (res) {
      const { name } = res;
      const hideToolRoute = [
        'article-article_id',
      ];
      const isHideTool = hideToolRoute.includes(name);
      this.setIsHideToolAction(isHideTool);
    }
  }
}
</script>
