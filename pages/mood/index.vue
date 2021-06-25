<template>
  <div id="mood">
    Mood
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "About",
  head() {
    return {
      title: `短句 | KaiKaio`,
    }
  },

  data(){
    return {
    }
  },

  computed: {
    ...mapState({

    }),
  },

  mounted() {

  },

  methods: {
    ...mapActions({
      musicSwich: 'Music/musicSwich'
    })
  }
};
</script>

<style lang="scss">
#mood {
}
</style>
