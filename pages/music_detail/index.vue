<template>
  <div id="music_detail">

    <div class="albumart-wrapper">
      <div class="progress">
      </div>

      <div v-if="imgFlag" class="albumart" :class="{ 'playing': playStatus === true }">
        <skeleton-base :radius=190 v-show="!skeletonFlag" />
        <img
          @load="loadImage"
          :style="skeletonFlag === true ? 'opacity: 1' : 'opacity: 0'"
          :src="sourceUrl[musicIndex].albumart">
      </div>

      <div class="toggle-box">
        <transition name="module" mode="out-in">
          <button
            key="pause"
            class="toggle-btn"
            @click="playMusic"
            v-if="!playStatus"
          >
            <svg style="padding-left: 0.4rem;" class="icon player-icon" aria-hidden="true">
              <use xlink:href="#icon-play" />
            </svg>
          </button>

          <button
            key="play"
            class="toggle-btn"
            @click="playMusic"
            v-else
          >
            <svg class="icon player-icon" aria-hidden="true">
              <use xlink:href="#icon-pause" />
            </svg>
          </button>
        </transition>
      </div>

    </div>

    <div class="song-info">
      <div :style="{transform: `translateY(${transY}rem)`}">
        <p
          class="lrc"
          :class="{'active': currentContent.dataTime === item.dataTime}"
          v-for="item in lrc"
          :key="item.dataTime">
          {{ item.textContent === '' ? '&nbsp;' : item.textContent }}
        </p>
      </div>
    </div>


  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Base64 } from 'js-base64';

export default {
  name: "MusicDetail",
  head() {
    return {
      title: `音乐 | KaiKaio`
    }
  },
  data() {
    return {
      imgFlag: false,
      skeletonFlag: false,
      lrc: [],
      currentContent: '',
      transY: 0,
    }
  },

  computed: {
    ...mapState({
      sourceUrl: state => state.Music.MusicList,
      musicIndex: state => state.Music.playIndex,
      playStatus: state => state.Music.playStatus,
      time: state => state.Music.currentTime
    }),
  },

  mounted() {
    console.log('XX')
    // 轮询查看数据是否返回
    let checkData = setInterval(() => {
      if(this.sourceUrl.length > 0) {
        this.imgFlag = true
        this.parseLrc()
        clearInterval(checkData)
      }
    }, 50)
  },

  methods: {
    ...mapActions({
      musicSwich: 'Music/musicSwich'
    }),

    // 播放控制
    playMusic() {
      this.musicSwich(this.playStatus)
    },

    loadImage() {
      setTimeout(() => {
        this.skeletonFlag = true
      }, 1500);
    },

    parseLrc() {
      this.lrc = []

      let lyric = Base64.decode(this.sourceUrl[this.musicIndex].lrc)
      lyric.split('\n').forEach(string => {
        let regex = /\[([\d:.]+)\](.+)/
        let matches = string.match(regex)
        if(matches){
          let time = matches[1]
          let parts = time.split(':')
          let minutes = parts[0]
          let seconds = parts[1]
          let newTime = parseInt(minutes,10) * 60 + parseFloat(seconds,10)
          let obj = {
            'textContent': matches[2],
            'minutes': parts[0],
            'seconds': parts[1],
            'dataTime': newTime
          }
          newTime.toString() !== NaN.toString() && this.lrc.push(obj)
        } else {
          let time = string.replace(/\[|]/g,'') // 去除中括号
          let parts = time.split(':')
          let minutes = parts[0]
          let seconds = parts[1]
          let newTime = parseInt(minutes,10) * 60 + parseFloat(seconds,10)
          let obj = {
            'textContent': '',
            'minutes': parts[0],
            'seconds': parts[1],
            'dataTime': newTime
          }
          newTime.toString() !== NaN.toString() && this.lrc.push(obj)
        }
      })
    },

    computedLrc(newTime){

      for (let i = 0; i < this.lrc.length; i++){

        if (i === this.lrc.length - 1){ // 如果是最后一句则跳出整个循环
          this.currentContent = this.lrc[i];
          break;
        }

        let currentTime = this.lrc[i].dataTime
        let nextTime = this.lrc[i + 1].dataTime

        if (!(newTime >= currentTime && newTime < nextTime)){ // 如果计算时间还在当前句则跳出，进入下一个循环
          continue;
        }

        if (this.currentContent.dataTime === this.lrc[i].dataTime) { // 如果是同一句，则不做操作
          break;
        }

        this.transY = -(i * 2.7) + 2.7;
        this.currentContent = this.lrc[i];
        break;

      }
    }
  },

  watch: {
    time: function(newTime) {
      this.computedLrc(newTime)
    },

    musicIndex: function() {
      this.parseLrc()
      this.transY = 2
      this.currentContent = ''
      this.skeletonFlag = false
    }
  }
};
</script>

<style lang="scss">
#music_detail {
  color: #fff;
  width: 100%;
  .albumart-wrapper {
    position: relative;
    width: 100%;
    height: 34rem;
    margin: 0 auto;
    .albumart {
      position: absolute;
      width: 34rem;
      height: 34rem;
      left: 50%;
      margin-left: calc(-34rem / 2);
      border-radius: 50%;
      opacity: .8;
      transition: all .3s;
      overflow: hidden;
      @keyframes rotation {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
      }
      animation: rotation 26s linear infinite;
      animation-play-state: paused;
      &.playing {
        animation-play-state: running;
      }

      &:hover {
        opacity: 1;
      }
      > img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-color: darkgray;
        background-size: cover;
        transition: all .5s;
      }
    }

    .progress {
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .toggle-box{
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
      top: 50%;
      transform: translateY(-50%);
      .toggle-btn {
        width: 4rem;
        height: 4rem;
        text-align: center;
        background-color: rgb(186, 186, 186);
        border-radius: 100%;
        opacity: .5;
        transition: all .3s;
        cursor: pointer;
        outline: none;
        &:hover {
          opacity: .8;
          transform: scale(1.2);
        }
        .player-icon {
          width: 60%;
          height: 60%;
          fill: #fff;
        }
      }
    }
  }

  .song-info {
    margin-top: 2rem;
    height: 14rem;
    overflow-y: hidden;
    mask-image: linear-gradient(
      to bottom,
      rgba(255,255,255,0) 0,
      rgba(255,255,255,.6) 15%,
      rgba(255,255,255,1) 25%,
      rgba(255,255,255,1) 75%,
      rgba(255,255,255,.6) 85%,
      rgba(255,255,255,0) 100%
    );
    >div {
      transition: all .3s;
      margin-top: 25px;
      .lrc {
        font-size: $font-size-h3;
        margin-bottom: 0px;
        line-height: 2.7rem;
        transition: all .3s;
        text-align: center;
      &.active {
          color: rgba(5, 180, 147, 1);
        }
      }
    }
  }

  .module-enter-active, .module-leave-active {
    transition: opacity .3s;
  }
  .module-enter, .module-leave-active {
    opacity: 0
  }

}
</style>
