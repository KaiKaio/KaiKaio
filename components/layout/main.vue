<template>
  <div id="main">
    <Header />

    <client-only>
      <Background />
    </client-only>

    <main id="main">
      <transition name="transitionRouter">
        <nuxt keep-alive />
      </transition>
    </main>

  </div>
</template>

<script>
import Header from './header'
import Background from '@/components/widget/background'

export default {
  name: 'Main',
  components: {
    Header,
    Background
  }
}
</script>

<style lang="scss">
main {
  width: 80%;
  margin: 0rem auto 0rem;
  padding: 5.6rem 0rem;
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
