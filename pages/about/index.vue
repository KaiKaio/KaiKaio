<template>
  <div id="about">
    <div class="about-wrapper">
      <img class="avatar" src="https://kaikai-bloga.oss-cn-beijing.aliyuncs.com/about/KaiAvatar.jpeg" alt="avatar">
      <ul>
        <li>
          <svg class="icon about-icon" aria-hidden="true">
            <use xlink:href="#icon-seeuser" />
          </svg>

          <div class="li-content">开开哦</div>
        </li>
        <li>
          <svg class="icon about-icon" aria-hidden="true">
            <use xlink:href="#icon-codecodinghtmlcssprogramming" />
          </svg>

          <div class="li-content">Vue | React | Nodejs | JavaScript </div>
        </li>
        <li>
          <svg class="icon about-icon" aria-hidden="true" style="fill: #0088f5">
            <use xlink:href="#icon-xinhao1" />
          </svg>

          <div class="li-content">
            <a target="_blank" href="https://github.com/KaiKaio">
              <svg class="icon about-icon github" aria-hidden="true">
                <use xlink:href="#icon-git" />
              </svg>
            </a>

            <a target="_blank" href="https://weibo.com/chenkaiwei9">
              <svg class="icon about-icon weibo" aria-hidden="true">
                <use xlink:href="#icon-weibo" />
              </svg>
            </a>
          </div>

        </li>
        <li>
          <svg class="icon about-icon" aria-hidden="true">
            <use xlink:href="#icon-shuo" />
          </svg>

          <div class="li-content">
            一枚前端开发~
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
      title: `关于 | KaiKaio`
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
            margin-right: 1rem;
            color: #555;
          }
        }
      }
    }
  }
}
</style>
