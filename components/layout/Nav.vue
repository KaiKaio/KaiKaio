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
        {name: '文章', icon: 'icon-wenzhang', link: '/'},
        {name: '音乐', icon: 'icon-yinyue', link: '/music_detail'},
        {name: '短句', icon: 'icon-dongtai', link: '/mood'},
        {name: '关于我', icon: 'icon-mingpian', link: '/about'},
      ]
    }
  }
}
</script>

<style lang="scss">
#nav {
  display: flex;
  flex-direction: column;
  position: sticky;
  height: fit-content;
  top: 5.2rem;
  width: 20%;
  min-width: 200px;
  a {
    text-decoration: none;
    color: #fff;
    padding: 1rem 0.6rem;
    transition: all .3s;
    &:hover {
      background: rgba($color: #333, $alpha: .5);
    }
    .icon {
      width: 1.3rem;
      height: 1.3rem;
      margin-right: .5rem;
    }
  }
}
</style>
