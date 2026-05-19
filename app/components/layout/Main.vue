<template>
  <div>
    <Header @toggle-menu="toggleNav" />

    <ClientOnly>
      <Background />
    </ClientOnly>

    <main ref="main" :style="{ paddingBottom: `${footerHeight}px`}">
      <div class="nav-wrapper" :class="{ 'nav-open': isNavOpen }">
        <Nav @close="closeNav" />
      </div>
      <div class="nav-overlay" v-if="isNavOpen && isMobile" @click="closeNav"></div>

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
const isNavOpen = ref(false)
const { isMobile } = useDevice()

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
}

const initMainHeight = () => {
  if (footer.value?.$el) {
    footerHeight.value = footer.value.$el.offsetHeight
  }
}

onMounted(() => {
  initMainHeight()
})

watch(isMobile, (mobile) => {
  if (!mobile) {
    isNavOpen.value = false
  }
})
</script>

<style lang="scss">
main {
  min-width: 320px;
  max-width: 1080px;
  margin: 0rem auto;
  padding: 7rem 0rem 0rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  
  > #main-container,
  > #music_detail,
  > #about,
  > #mood,
  > article {
    width: 55%;
    min-width: 320px;
  }
  
  > .nav-wrapper {
    width: 200px;
    flex-shrink: 0;
    transition: transform $transition-time-slow ease-out;
  }
  
  > .main-center {
    flex: 1;
    margin: 0px 20px;
  }
  
  > #tool {
    width: 252px;
    flex-shrink: 0;
  }
}

.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

@include mobile {
  main {
    min-width: 100%;
    padding: 5rem 0rem 0rem;
    
    > .nav-wrapper {
      position: fixed;
      top: 5rem;
      left: 0;
      bottom: 0;
      width: 280px;
      transform: translateX(-100%);
      z-index: 101;
      background-color: $mobile-aside-bg;
      
      &.nav-open {
        transform: translateX(0);
      }
    }
    
    > .main-center {
      flex: 1;
      margin: 0px 10px;
      width: 100%;
    }
    
    > #main-container,
    > #music_detail,
    > #about,
    > #mood,
    > article {
      width: 100%;
      min-width: auto;
    }
    
    > #tool {
      display: none;
    }
  }
}

@include tablet {
  main {
    min-width: 720px;
    
    > .nav-wrapper {
      width: 180px;
    }
    
    > .main-center {
      margin: 0px 15px;
    }
    
    > #tool {
      width: 220px;
    }
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
