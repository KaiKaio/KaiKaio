<template>
  <header id="header">
    <div class="header-container">
      <div class="logo" @click="toHome">
        <svg class="icon logo-icon" aria-hidden="true">
          <use xlink:href="#icon-cat" />
        </svg>
        <span class="logo-font">KaiKaio</span>
        <p class="header-slogan" v-text="$appConfig.meta.description"></p>
      </div>

      <Music />
    </div>
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
  top: 0rem;
  left: 0rem;
  height: 4rem;
  background-color: rgba(00, 00, 00, 0.7);
  backdrop-filter: blur(5px);
  color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  padding: .6rem 0rem;
  z-index: 10;
  .header-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    .logo {
      cursor: pointer;
      .icon.logo-icon {
        width: 2rem;
        height: 2rem;
        fill: #fff;
      }
      .logo-font {
        font-size: 1.4rem;
        margin-left: 0.2rem;
      }
    }
    .header-slogan {
      font-size: 0.8rem;
      margin: 0.4rem 0px 0px 0px;
    }
  }
}
</style>
