<template>
  <header id="header">
    <div class="header-container">
      <div class="logo">
        <svg class="icon logo-icon" aria-hidden="true">
          <use xlink:href="#icon-cat" />
        </svg>
        <span class="logo-font">KaiKaio</span>
      </div>
      <p class="header-slogan" v-text="$appConfig.meta.description"></p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  background-color: rgba(00, 00, 00, 0.7);
  backdrop-filter: blur(5px);
  color: #fff;
  padding: 10px 0px;
  width: 100vw;
  height: 57px;
  .header-container {
    width: 75%;
    margin: 0 auto;
    .logo {
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
