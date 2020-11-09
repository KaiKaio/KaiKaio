<template>
  <div>
    <Header />

    <client-only>
      <Background />
    </client-only>

    <main ref="main">
      <Nav />

      <transition name="transitionRouter">
        <nuxt ref="middle" keep-alive />
      </transition>

      <Tool />
    </main>

  </div>
</template>

<script>
import Header from '@/components/layout/header'
import Nav from '@/components/layout/Nav'
import Tool from '@/components/layout/Tool'

import Background from '@/components/widget/background'

export default {
  name: 'Main',
  components: {
    Header,
    Background,
    Nav,
    Tool
  },
  data() {
    return {}
  },
  mounted() {},
}
</script>

<style lang="scss">
main {
  width: 90%;
  margin: 0rem auto;
  padding: 6rem 0rem 4rem;
  display: flex;
  justify-content: space-between;
  > #main-container,
  > #music_detail,
  > #about,
  > article {
    width: 55%;
    min-width: 400px;
  }
}

.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 1s;
}

.transitionRouter-enter,
.transitionRouter-leave{
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
