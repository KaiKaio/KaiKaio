<template>
  <header id="header">
    <div class="header-container">
      <transition name="transitionRouter" mode="out-in">
        <div class="header-title" key="title" v-if="showTitle">{{ articleList[index]?.title }}</div>
        <div key="logo" class="logo" @click="toHome" v-else>
          <svg class="icon logo-icon" aria-hidden="true">
            <use xlink:href="#icon-cat" />
          </svg>
          <span class="logo-font">KaiKaio</span>
          <p class="header-slogan">一代人终将老去，但也总有人正年轻</p>
        </div>
      </transition>
      <Music />
    </div>
  </header>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { articleList } = useArticle()

const scrollBefore = ref(0)
const scrollAfter = ref(0)
const showTitle = ref(false)
const index = ref(0)

const toHome = () => {
  router.push('/')
}

const handleScroll = () => {
  scrollAfter.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  if (scrollAfter.value - scrollBefore.value > 0) {
    showTitle.value = true
  } else if (scrollAfter.value - scrollBefore.value < 0) {
    showTitle.value = false
  }
  scrollBefore.value = scrollAfter.value
}

watch(() => route.name, (routeName) => {
  if (import.meta.client) {
    if (routeName === 'article-article_id') {
      window.addEventListener('scroll', handleScroll)
      index.value = parseInt(route.params.article_id as string)
    } else {
      window.removeEventListener('scroll', handleScroll)
      showTitle.value = false
    }
  }
}, { immediate: true })

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0rem;
  left: 0rem;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  color: #fff;
  width: 100%;
  z-index: 10;
  .header-container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 10px 0px;
    .logo {
      font-weight: 700;
      cursor: pointer;
      .icon.logo-icon {
        width: 2.7rem;
        height: 2.7rem;
        fill: #fff;
      }
      .logo-font {
        font-size: $font-size-h2;
        margin-left: 0.2rem;
      }
    }
    .header-slogan {
      margin: 0rem 0px 0px 0px;
    }
    > .header-title {
      display: flex;
      align-items: center;
      font-size: $font-size-h2;
      font-weight: 700;
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
}
</style>
