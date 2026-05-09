<template>
  <div id="music">
    <div class="music-player">
      <div class="icons-wrapper">
        <svg class="icon player-icon" @click="swichIndex('prev')" aria-hidden="true">
          <use xlink:href="#icon-prev-copy" />
        </svg>

        <svg @click="playMusic" class="icon player-icon" aria-hidden="true">
          <use v-show="playStatus === true" xlink:href="#icon-pause" />
          <use v-show="playStatus === false" xlink:href="#icon-play" />
        </svg>

        <svg class="icon player-icon" @click="swichIndex('next')" aria-hidden="true">
          <use xlink:href="#icon-next" />
        </svg>

        <svg @click="handleMusicList" class="icon player-icon play-list" aria-hidden="true">
          <use xlink:href="#icon-yinleliebiao1"/>
        </svg>
      </div>

      <div class="audio-progress" ref="audioProgress" @mousedown="controlAudioProgress($event)">
        <span class="bar" :style="progressStyle"></span>
      </div>

      <div class="music-detail" @click="router.push('/music_detail')">
        <span class="song-name" v-if="sourceUrl.length > 0">{{ sourceUrl[musicIndex]?.title }} - {{ sourceUrl[musicIndex]?.singer }}</span>
        <span v-else>暂无歌曲</span>
      </div>
    </div>

    <audio v-if="clickSwich" @ended="onEnded" ref="homeAudio" @timeupdate="timeUpdate">
      <source v-if="sourceUrl.length > 0" :src="sourceUrl[musicIndex]?.url" type="audio/mpeg">
    </audio>

    <ul class="music-list" v-show="musicList">
      <h4>播放列表</h4>
      <li :class="{'active': index === musicIndex}" v-for="(item, index) in sourceUrl" :key="item._id" @click="selectMusic(index)">
        <span>{{ item.title }}</span>
        <span>{{ item.singer }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { musicList: sourceUrl, playIndex: musicIndex, playStatus, fetchMusicList, changeIndex, togglePlayStatus, updateCurrentTime } = useMusic()

const homeAudio = ref<HTMLAudioElement>()
const audioProgress = ref<HTMLElement>()
const duration = ref('00:00')
const currentTime = ref('00:00')
const progressStyle = ref({width: '0%'})
const clickSwich = ref(true)
const musicList = ref(false)

const selectMusic = (index: number) => {
  swichIndex(index)
}

const handleMusicList = () => {
  musicList.value = !musicList.value
}

const playMusic = () => {
  togglePlayStatus()
}

const swichIndex = (mark: 'prev' | 'next' | number) => {
  progressStyle.value.width = '0%'
  clickSwich.value = false
  togglePlayStatus()
  
  nextTick(() => {
    clickSwich.value = true
    changeIndex(mark)
    setTimeout(() => {
      playMusic()
    }, 100)
  })
}

const onEnded = () => {
  swichIndex('next')
}

const transTime = (value: number) => {
  let time = ""
  const h = parseInt(String(value / 3600))
  value %= 3600
  const m = parseInt(String(value / 60))
  const s = parseInt(String(value % 60))
  if (h > 0) {
    time = formatTime(`${h}:${m}:${s}`)
  } else {
    time = formatTime(`${m}:${s}`)
  }
  return time
}

const formatTime = (value: string) => {
  let time = ""
  const s = value.split(':')
  let i = 0
  for (; i < s.length - 1; i++) {
    time += s[i].length == 1 ? ("0" + s[i]) : s[i]
    time += ":"
  }
  time += s[i].length == 1 ? ("0" + s[i]) : s[i]
  return time
}

const timeUpdate = () => {
  if (!homeAudio.value) return
  
  updateCurrentTime(homeAudio.value.currentTime)
  duration.value = transTime(homeAudio.value.duration)
  const timeStr = parseInt(String(homeAudio.value.currentTime))
  currentTime.value = transTime(timeStr)
  const scales = homeAudio.value.currentTime / homeAudio.value.duration
  progressStyle.value.width = scales * 100 + '%'
}

const controlAudioProgress = (event: MouseEvent) => {
  const audio = homeAudio.value
  const progress = audioProgress.value
  
  if (!audio || !progress) return
  
  if (!audio.paused || audio.currentTime != 0) {
    const pgsWidth = parseFloat(window.getComputedStyle(progress, null).width.replace('px', ''))
    const rate = event.offsetX / pgsWidth
    audio.currentTime = audio.duration * rate
    timeUpdate()
  }
}

onMounted(async () => {
  await fetchMusicList()
  
  const playEvent = () => {
    const checkData = setInterval(() => {
      if (sourceUrl.value.length > 0) {
        playMusic()
        clearInterval(checkData)
        document.body.removeEventListener("click", playEvent)
      }
    }, 50)
  }
  document.body.addEventListener('click', playEvent)
})

watch(playStatus, (after) => {
  const audio = homeAudio.value
  if (!audio) return
  
  if (after === true && audio.paused === true) {
    audio.play()
  } else if (after === false && audio.paused === false) {
    audio.pause()
  }
})
</script>

<style lang="scss" scoped>
#music {
  width: 20rem;
  margin-left: auto;
  position: relative;
  font-size: $font-size-base;
  .music-player {
    color: #FFF;
    .icons-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .player-icon {
        fill: #FFF;
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer;
        transition: all .3s;
        margin-right: 1rem;
        &.play-list {
          width: 1.8rem;
          height: 1.8rem;
        }
      }
      .player-icon:hover {
        fill: rgba(5, 180, 147, 1);
      }
    }
    .audio-progress {
      position: relative;
      height: 0.3rem;
      background: rgba(212, 249, 232, 1);
      border-radius: 1px;
      margin-top: 0.6rem;
      cursor: pointer;
      .bar {
        position: absolute;
        height: 100%;
        background: rgba(5, 180, 147, 1);
        border-radius: 3px;
      }
    }
    .music-detail {
      margin-top: 0.6rem;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        color: rgba(5, 180, 147, 1);
      }
      > .song-name {
        font-size: $font-size-small;
        font-weight: 700;
        @include text-overflow();
      }
    }
  }

  .music-list {
    position: absolute;
    margin-top: 1rem;
    padding: 0rem 0.4rem 0.6rem;
    border-radius: 0.2rem;
    background-color: #fff;
    list-style: none;
    max-height: 10rem;
    overflow-y: auto;
    color: #666;
    box-shadow: 0 2px 6px #fff;
    animation-name: musicListAni;
    animation-duration: 1s;
    animation-fill-mode: none;
    width: 100%;

    @keyframes musicListAni {
      0% {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        transition-timing-function: ease-in;
        opacity: 0;
      }
      40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        transition-timing-function: ease-in;
      }
      60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
      }
      80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
      }
      100% {
        transform: perspective(400px);
      }
    }
    > li {
      position: relative;
      padding: 0.4rem 0.8rem;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      transition: all .3s;
      border-radius: 0.3rem;
      font-size: $font-size-small;
      font-weight: 700;
      @include text-overflow();
      &:hover {
        background: rgb(221, 216, 216);
      }
      &.active::before {
        position: absolute;
        left: 0rem;
        height: calc(100% - 0.8rem);
        content: '';
        display: block;
        width: 0.3rem;
        background: #05b493;
      }
    }
    > h4 {
      margin: 0px;
      padding: 6px 0px;
      position: sticky;
      top: 0;
      background: #fff;
      z-index: 1;
      box-shadow: 0 2px 6px #fff;
      font-size: $font-size-h4;
      font-weight: bold;
    }
  }
}
</style>
