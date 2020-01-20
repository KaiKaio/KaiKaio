<template>
  <header id="header">
    <div class="header-container">
      <div class="logo" @click="toHome">
        <svg class="icon logo-icon" aria-hidden="true">
          <use xlink:href="#icon-cat" />
        </svg>
        <span class="logo-font">KaiKaio</span>
      </div>
      <p class="header-slogan" v-text="$appConfig.meta.description"></p>
    </div>
    <Music />
  </header>
</template>

<script>
import Music from './music'

export default {
  name: 'Header',
  components: {
    Music
  },
  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  left: 10vw;
  background-color: rgba(00, 00, 00, 0.7);
  backdrop-filter: blur(5px);
  color: #fff;
  width: 80vw;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  padding: 2rem 0rem;
  z-index: 10;
  .header-container {
    margin-left: 10rem;
    .logo {
      cursor: pointer;
      .icon.logo-icon {
        width: 32px;
        height: 32px;
        fill: #fff;
      }
      .logo-font {
        font-size: 22px;
        margin-left: 10px;
      }
    }
    .header-slogan {
      margin: 6px 0px 0px 0px;
    }
  }
}
</style>
