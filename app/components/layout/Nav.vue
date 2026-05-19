<template>
  <nav id="nav">
    <NuxtLink v-for="item in navList" :key="item.name" :to="item.link" @click="handleNavClick">
      <svg class="icon date" aria-hidden="true">
        <use :xlink:href="`#${item.icon}`" />
      </svg>
      <span>{{ item.name }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const navList = [
  {name: '文章', icon: 'icon-wenzhang', link: '/'},
  {name: '音乐', icon: 'icon-yinyue', link: '/music_detail'},
  {name: '短句', icon: 'icon-dongtai', link: '/mood'},
  {name: '关于我', icon: 'icon-mingpian', link: '/about'},
]

const handleNavClick = () => {
  emit('close')
}
</script>

<style lang="scss">
#nav {
  font-size: $font-size-h3;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  position: fixed;
  min-width: 200px;
  
  a {
    text-decoration: none;
    color: #fff;
    padding: 1rem 0.6rem;
    transition: all .3s;
    display: flex;
    align-items: center;
    
    &:hover {
      background: rgba($color: #333, $alpha: .5);
    }
    
    .icon {
      width: $font-size-h3;
      height: $font-size-h3;
      margin-right: .5rem;
      flex-shrink: 0;
    }
    
    span {
      @include text-overflow();
    }
  }
}

@include mobile {
  #nav {
    min-width: 100%;
    padding-top: 1rem;
    
    a {
      padding: 1.2rem 1.5rem;
      font-size: $font-size-large;
      
      .icon {
        width: $font-size-large;
        height: $font-size-large;
        margin-right: 1rem;
      }
    }
  }
}
</style>
