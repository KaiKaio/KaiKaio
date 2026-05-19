<template>
  <header id="header">
    <div class="header-container">
      <button class="menu-toggle" v-if="isMobile" @click="emit('toggle-menu')" aria-label="菜单">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      <transition name="transitionRouter" mode="out-in">
        <div class="header-title" key="title" v-if="showTitle">{{ articleList[index]?.title }}</div>
        <div key="logo" class="logo" @click="toHome" v-else>
          <svg class="icon logo-icon" aria-hidden="true">
            <use xlink:href="#icon-cat" />
          </svg>
          <span class="logo-font">KaiKaio</span>
          <p class="header-slogan" v-if="!isMobile">一代人终将老去，但也总有人正年轻</p>
        </div>
      </transition>
      <Music />
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'toggle-menu': []
}>()

const router = useRouter()
const route = useRoute()
const { articleList } = useArticle()
const { isMobile } = useDevice()

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
    
    .menu-toggle {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      padding: 0.5rem;
      margin-right: 0.5rem;
      cursor: pointer;
      gap: 4px;
      width: 2.5rem;
      height: 2.5rem;
      
      .hamburger-line {
        display: block;
        width: 1.5rem;
        height: 2px;
        background-color: #fff;
        transition: all 0.3s;
      }
      
      &:hover .hamburger-line {
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
    
    .logo {
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      
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
      width: 100%;
      font-size: $font-size-small;
    }
    
    > .header-title {
      display: flex;
      align-items: center;
      font-size: $font-size-h2;
      font-weight: 700;
      flex: 1;
      @include text-overflow();
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

@include mobile {
  header {
    .header-container {
      width: 95%;
      padding: 8px 0px;
      
      .logo {
        .icon.logo-icon {
          width: 2rem;
          height: 2rem;
        }
        
        .logo-font {
          font-size: $font-size-h3;
        }
      }
      
      > .header-title {
        font-size: $font-size-h3;
      }
    }
  }
}
</style>
