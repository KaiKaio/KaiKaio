<template>
  <div>
    <Header />

    <client-only>
      <Background />
    </client-only>

    <main ref="main">
      <Nav :navWidth="navWidth"/>

      <transition name="transitionRouter">
        <nuxt ref="middle" keep-alive />
      </transition>

      <Tool :navWidth="navWidth" :marginLeft="marginLeft" />
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
    return {
      navWidth: 0,
      marginLeft: 0
    }
  },
  mounted() {
    const middleWidth = this.$refs.middle.$el.clientWidth // 中间宽度
    const totalWidth = middleWidth / 0.5
    this.navWidth = totalWidth * 0.22

    this.marginLeft = this.$refs.main.getBoundingClientRect().left
  },
}
</script>

<style lang="scss">
main {
  width: 80%;
  margin: 0rem auto;
  padding: calc(4rem + .6rem * 2) 0rem 4rem;
  > #main-container,
  > #music_detail,
  > #about,
  > article {
    width: 50%;
    margin: 0 auto;
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
