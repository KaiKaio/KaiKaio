<template>
  <div class="global-background">
    <div class="background-image"></div>
  </div>
</template>

<script>
export default {
  name: 'Background',
}
</script>

<style lang="scss" scoped>
.global-background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: -1;
  > .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(/images/background.png);
    background-position: center center;
    background-size: cover;
  }
}
</style>
