<template>
  <div id="about">
    <div class="about-wrapper">
      <img class="avatar" src="http://10.242.46.156:7009/public/upload/20260507/1778085014180.png" alt="avatar">
      <ul class="list-info">
        <li v-for="(item, index) in aboutList" :key="index">
          <svg class="icon about-icon" aria-hidden="true">
            <title>{{item.description}}</title>
            <use :xlink:href="`#${item.icon}`" />
          </svg>

          <div v-if="item.content" class="li-content">{{item.content}}</div>
          <div v-if="item.linkList" class="li-content">
            <a v-for="itemChild in item.linkList" :key="itemChild.id" target="_blank" :href="itemChild.href">
              <svg :class="['icon', 'about-icon', itemChild.description]" aria-hidden="true">
                <title>{{itemChild.description}}</title>
                <use :xlink:href="`#${itemChild.icon}`" />
              </svg>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const aboutList = [
  {
    description: '名字',
    icon: 'icon-UserSettings',
    content: 'Kaikaio',
  },
  {
    description: '社交',
    icon: 'icon-shejiao',
    linkList: [
      {
        id: 1,
        href: 'https://github.com/KaiKaio',
        description: 'Github',
        icon: 'icon-git',
      },
      {
        id: 2,
        href: 'https://weibo.com/chenkaiwei9',
        description: 'Weibo',
        icon: 'icon-square-Weibo',
      },
    ],
  },
  {
    description: '描述',
    icon: 'icon-miaoshu',
    content: 'Barbarous Growth ~ 🌱 And I Wish You Luck! ✨',
  },
]

useHead({
  title: '关于 | KaiKaio'
})
</script>

<style lang="scss">
#about {
  margin-top: 5.5rem !important;
  color: #555;
  font-size: $font-size-base;
  > .about-wrapper {
    padding: 4rem 1rem 1rem;
    position: relative;
    background-color: rgba($color: #fff, $alpha: 0.8);
    > .avatar {
      position: absolute;
      top: -5.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 11rem;
      height: 11rem;
      z-index: 1;
      max-width: 100%;
      border-radius: 100%;
      border: 0.3125rem solid hsla(0,0%,77.3%,0.5);
    }
    > ul.list-info {
      list-style: none;
      padding-left: 12px;
      >li {
        padding: 0.5rem 0rem;
        margin-bottom: 1.2rem;
        display: flex;
        align-items: baseline;
        .about-icon {
          width: $font-size-large;
          height: $font-size-large;
          transition: all .3s;
          &.Weibo {
            &:hover {
              fill: #e3091c;
            }
          }
          &.Github {
            &:hover {
              fill: #000
            }
          }
        }
        > .li-content {
          margin-left: 1.5rem;
          display: flex;
          column-gap: 1rem;
          > a {
            display: block;
            width: $font-size-large;
            height: $font-size-large;
            color: #555;
          }
        }
      }
    }
  }
}
</style>
