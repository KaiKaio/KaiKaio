<template>
  <header id="header">
    <div class="header-container">
      <div class="logo">
        <svg class="icon logo-icon" aria-hidden="true">
          <use xlink:href="#icon-cat" />
        </svg>
        <span class="logo-font">KaiKaio</span>
        <span class="header-slogan" v-text="$appConfig.description"></span>
      </div>
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
  background-color:#3C3C3C;
  color: #fff;
  padding: 10px 0px;
  .header-container {
    width: 75vw;
    margin: 0 auto;
    .logo {
      font-size: 22px;
      display: flex;
      align-items: center;
      .icon.logo-icon {
        width: 32px;
        height: 32px;
        fill: #fff;
      }
      .logo-font {
        margin-left: 10px;
      }
    }
  }
}
</style>
