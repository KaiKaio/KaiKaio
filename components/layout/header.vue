<template>
  <header id="header">
    <div class="header-container">


      <transition name="transitionRouter" mode="out-in">
        <div class="header-title" key="title" v-if="showTitle">{{ articleList[index].title }}</div>
        <div key="logo" class="logo" @click="toHome" v-else>
          <svg class="icon logo-icon" aria-hidden="true">
            <use xlink:href="#icon-cat" />
          </svg>
          <span class="logo-font">KaiKaio</span>
          <p class="header-slogan" v-text="$appConfig.meta.description"></p>
        </div>
      </transition>

      <Music />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

import Music from './music'

export default {
  name: 'Header',
  components: {
    Music
  },
  data() {
    return {
      scrollBefore: 0,
      scrollAfter: 0,
      showTitle: false,

      index: 0,
    }
  },

  computed: {
    ...mapState({
      articleList: state => state.Article.ArticleList
    }),
  },

  methods: {
    toHome() {
      this.$router.push('/')
    },

    handleScroll () {
      this.scrollAfter = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(this.scrollAfter - this.scrollBefore > 0) {
        this.showTitle = true
      } else if (this.scrollAfter - this.scrollBefore < 0) {
        this.showTitle = false
      }
      this.scrollBefore = this.scrollAfter
    }

  },
  watch: {
    //监听路由变化
    $route(to, from) {
      if(to.name === 'article-article_id') {
        window.addEventListener('scroll', this.handleScroll)
        this.index = this.$route.params.article_id
      } else {
        window.removeEventListener('scroll', this.handleScroll)
        this.showTitle = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0rem;
  left: 0rem;
  height: 4rem;
  background-color: rgba(00, 00, 00, 0.7);
  backdrop-filter: blur(5px);
  color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  padding: .6rem 0rem;
  z-index: 10;
  font-weight: 700;
  .header-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    .logo {
      cursor: pointer;
      .icon.logo-icon {
        width: 2rem;
        height: 2rem;
        fill: #fff;
      }
      .logo-font {
        font-size: 1.4rem;
        margin-left: 0.2rem;
      }
    }
    .header-slogan {
      font-size: 0.8rem;
      margin: 0.4rem 0px 0px 0px;
    }
    > .header-title {
      display: flex;
      align-items: center;
      font-size: 1.3rem;
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
