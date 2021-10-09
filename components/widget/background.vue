<template>
  <div class="global-background">
    <div class="background-image" :style="{
      backgroundImage: `url(${backgroundUrl})`
    }"></div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  data() {
    return {
      backgroundUrl: ''
    }
  },
  mounted() {
    this.fetchBackground()
  },
  methods: {
    fetchBackground() {
      this.$axios.get('/Background').then((res)=> {
        this.backgroundUrl = res.data.data[0].url
      }).catch(err => {
        this.backgroundUrl = 'https://kaikai-bloga.oss-cn-beijing.aliyuncs.com/background/Moon.jpeg'
        console.log('获取背景失败', err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.global-background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  filter: brightness(0.9);
  z-index: -1;
  > .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    // background: url(/images/background.png);
    background-position: center center;
    background-size: cover;
  }
}
</style>
