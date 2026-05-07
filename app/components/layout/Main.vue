<template>
  <div>
    <Header />

    <ClientOnly>
      <Background />
    </ClientOnly>

    <main ref="main" :style="{ paddingBottom: `${footerHeight + 20}px`}">
      <div class="nav-wrapper">
        <Nav />
      </div>

      <transition name="transitionRouter">
        <div>
          <NuxtPage ref="middle" keep-alive />
        </div>
      </transition>

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
  width: 90%;
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
