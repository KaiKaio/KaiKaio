<template>
  <nav id="nav">
    <nuxt-link v-for="item in navList" :key="item.name" :to="item.link">
      <svg class="icon date" aria-hidden="true">
        <use :xlink:href="`#${item.icon}`" />
      </svg>
      <span>{{ item.name }}</span>
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      navList: [
        {name: '文章', icon: 'icon-shouye', link: '/'},
        {name: '音乐', icon: 'icon-yinyue', link: '/music_detail'},
        {name: '关于我', icon: 'icon-UserSettings', link: '/about'},
      ]
    }
  }
}
</script>

<style lang="scss">
#nav {
  width: 24%;
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    color: #fff;
    padding: 0.4rem 0.6rem;
    transition: all .3s;
    &:hover {
      background: rgba($color: #333, $alpha: .8);
    }
    .icon {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
}
</style>
