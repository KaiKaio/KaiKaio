<template>
  <div id="music_detail">
    <div class="albumart-wrapper">
      <div class="progress"></div>

      <div v-if="imgFlag" class="albumart" :class="{ 'playing': playStatus === true }">
        <skeleton-base :radius="190" v-show="!skeletonFlag" />
        <img
          @load="loadImage"
          :style="skeletonFlag === true ? 'opacity: 1' : 'opacity: 0'"
          :src="sourceUrl[musicIndex]?.albumart">
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

<script setup lang="ts">
import { Base64 } from 'js-base64'
import SkeletonBase from '~/components/global/skeleton/base.vue'

const { musicList: sourceUrl, playIndex: musicIndex, playStatus, currentTime: time, togglePlayStatus } = useMusic()

const imgFlag = ref(false)
const skeletonFlag = ref(false)
const lrc = ref<any[]>([])
const currentContent = ref<any>('')
const transY = ref(0)

const playMusic = () => {
  togglePlayStatus()
}

const loadImage = () => {
  setTimeout(() => {
    skeletonFlag.value = true
  }, 1500)
}

const parseLrc = () => {
  lrc.value = []
  
  if (!sourceUrl.value[musicIndex.value]?.lrc) return
  
  const lyric = Base64.decode(sourceUrl.value[musicIndex.value].lrc)
  lyric.split('\n').forEach(string => {
    const regex = /\[([\d:.]+)\](.+)/
    const matches = string.match(regex)
    if (matches) {
      const time = matches[1]
      const parts = time.split(':')
      const minutes = parts[0]
      const seconds = parts[1]
      const newTime = parseInt(minutes, 10) * 60 + parseFloat(seconds, 10)
      const obj = {
        'textContent': matches[2],
        'minutes': parts[0],
        'seconds': parts[1],
        'dataTime': newTime
      }
      !isNaN(newTime) && lrc.value.push(obj)
    } else {
      const time = string.replace(/\[|]/g, '')
      const parts = time.split(':')
      const minutes = parts[0]
      const seconds = parts[1]
      const newTime = parseInt(minutes, 10) * 60 + parseFloat(seconds, 10)
      const obj = {
        'textContent': '',
        'minutes': parts[0],
        'seconds': parts[1],
        'dataTime': newTime
      }
      !isNaN(newTime) && lrc.value.push(obj)
    }
  })
}

const computedLrc = (newTime: number) => {
  for (let i = 0; i < lrc.value.length; i++) {
    if (i === lrc.value.length - 1) {
      currentContent.value = lrc.value[i]
      break
    }

    const currentTime = lrc.value[i].dataTime
    const nextTime = lrc.value[i + 1].dataTime

    if (!(newTime >= currentTime && newTime < nextTime)) {
      continue
    }

    if (currentContent.value.dataTime === lrc.value[i].dataTime) {
      break
    }

    transY.value = -(i * 2.7) + 2.7
    currentContent.value = lrc.value[i]
    break
  }
}

onMounted(() => {
  const checkData = setInterval(() => {
    if (sourceUrl.value.length > 0) {
      imgFlag.value = true
      parseLrc()
      clearInterval(checkData)
    }
  }, 50)
})

watch(time, (newTime) => {
  computedLrc(newTime)
})

watch(musicIndex, () => {
  parseLrc()
  transY.value = 2
  currentContent.value = ''
  skeletonFlag.value = false
})

useHead({
  title: '音乐 | KaiKaio'
})
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
