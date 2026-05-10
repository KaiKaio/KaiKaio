<template>
  <div>
    <Header />

    <ClientOnly>
      <Background />
    </ClientOnly>

    <main ref="main" :style="{ paddingBottom: `${footerHeight}px`}">
      <div class="nav-wrapper">
        <Nav />
      </div>

      <div class="main-center">
        <NuxtPage ref="middle" keep-alive />
      </div>

      <Tool />
    </main>
    
    <Footer ref="footer" :height="footerHeight" />
  </div>
</template>

<script setup lang="ts">
const footer = ref()
const footerHeight = ref(0)

const initMainHeight = () => {
  if (footer.value?.$el) {
    footerHeight.value = footer.value.$el.offsetHeight
  }
}

onMounted(() => {
  initMainHeight()
})
</script>

<style lang="scss">
main {
  min-width: 720px;
  max-width: 1080px;
  margin: 0rem auto;
  padding: 7rem 0rem 0rem;
  display: flex;
  justify-content: space-between;
  > #main-container,
  > #music_detail,
  > #about,
  > #mood,
  > article {
    width: 55%;
    min-width: 400px;
  }
  > .nav-wrapper {
    width: 200px;
    flex-shrink: 0;
  }
  > .main-center {
    flex: 1;
    margin: 0px 20px;
  }
}

.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 1s;
}

.transitionRouter-enter,
.transitionRouter-leave{
  opacity: 0;
  transform: translate3d(0, -10%, 0);
}
</style>
