<template>
  <div id="about">
    <div class="about-wrapper">
      <img class="avatar" src="https://kaikai-bloga.oss-cn-beijing.aliyuncs.com/about/KaiAvatar.jpeg" alt="avatar">
      <ul>
        <li v-for="(item, index) in aboutList" :key="index">
          <svg class="icon about-icon" aria-hidden="true">
            <title>{{item.description}}</title>
            <use :xlink:href="`#${item.icon}`" />
          </svg>

          <div v-if="item.content" class="li-content">{{item.content}}</div>
          <div v-if="item.linkList" class="li-content">
            <a v-for="itemChild in item.linkList" :key="itemChild.itemChild" target="_blank" :href="itemChild.href">
              <svg class="icon about-icon" aria-hidden="true">
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



<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "About",
  head() {
    return {
      title: `关于 | KaiKaio`,
    }
  },

  data(){
    return {
      aboutList: [
        {
          description: '名字',
          icon: 'icon-UserSettings',
          content: '开开哦',
        },
        {
          description: '技术栈',
          icon: 'icon-code',
          content: 'Vue \ React \ Nodejs \ JavaScript',
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
              description: '微博',
              icon: 'icon-weibo',
            },
          ],
        },
        {
          description: '描述',
          icon: 'icon-miaoshu',
          content: '一枚前端开发~',
        },
      ]
    }
  },

  computed: {
    ...mapState({

    }),
  },

  mounted() {

  },

  methods: {
    ...mapActions({
      musicSwich: 'Music/musicSwich'
    })
  }
};
</script>

<style lang="scss">
#about {
  margin-top: 4.3125rem !important;
  color: #555;
  background-color: #FFF;
  opacity: 0.9;
  > .about-wrapper {
    padding: 4.3125rem 2rem 1.6rem;
    position: relative;
    > .avatar {
      position: absolute;
      top: -4.3125rem;
      left: 50%;
      transform: translateX(-50%);
      width: 8rem;
      height: 8rem;
      z-index: 1;
      max-width: 100%;
      border-radius: 100%;
      border: 0.3125rem solid hsla(0,0%,77.3%,0.5);
    }
    > ul {
      font-size: 0.875rem;
      list-style: none;
      >li {
        padding: 0.5rem 0rem;
        margin-bottom: 1.2rem;
        display: flex;
        align-items: center;
        .about-icon {
          width: 1.2rem;
          height: 1.2rem;
          transition: all .3s;
          &.weibo {
            &:hover {
              fill: #e3091c;
            }
          }
          &.github {
            &:hover {
              fill: #000
            }
          }
        }
        > .li-content {
          margin-left: 1rem;
          > a {
            margin-right: 0.6rem;
            color: #555;
          }
        }
      }
    }
  }
}
</style>
