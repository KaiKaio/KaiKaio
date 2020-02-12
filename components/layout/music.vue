<template>
  <div id="music">
    <div class="music-player">

      <div class="icons-wrapper">
        <svg class="icon player-icon" @click="swichIndex('prev')" aria-hidden="true">
          <use xlink:href="#icon-audio-up" />
        </svg>

        <svg @click="playMusic" class="icon player-icon" aria-hidden="true">
          <use v-show="playStatus === true" xlink:href="#icon-zantingtingzhi" />
          <use v-show="playStatus === false" xlink:href="#icon-bofang" />
        </svg>

        <svg class="icon player-icon" @click="swichIndex('next')" aria-hidden="true">
          <use xlink:href="#icon-audio-down" />
        </svg>

        <svg @click="handleMusicList" class="icon player-icon play-list" aria-hidden="true">
          <use xlink:href="#icon-yinleliebiao1"/>
        </svg>
      </div>

      <div class="audio-progress" ref="audioProgress" @mousedown="controlAudioProgress($event)">
        <span class="bar" :style="progressStyle"></span>
      </div>

      <div class="music-detail" @click="$router.push('/music_detail')">
        <span v-if="sourceUrl.length > 0">{{ sourceUrl[musicIndex].title }} - {{ sourceUrl[musicIndex].singer }}</span>
        <span v-else>暂无歌曲</span>
      </div>

    </div>

    <audio v-if="clickSwich" @ended="onEnded" ref="homeAudio" @timeupdate="timeUpdate">
      <source v-if="sourceUrl.length > 0" :src="sourceUrl[musicIndex].url" type="audio/mpeg">
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

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Music',
  data() {
    return {
      duration: '00:00',
      currentTime: '00:00',
      progressStyle: {width: '0%'},
      clickSwich: true,
      musicList: false
    }
  },

  computed: {
    ...mapState({
      sourceUrl: state => state.Music.MusicList,
      musicIndex: state => state.Music.playIndex,
      playStatus: state => state.Music.playStatus
    }),
  },

  mounted() {
    this.$store.dispatch('Music/fetchMusicList')

    let playEvent = (e) => {
      console.log('执行移动事件')
      // 轮询查看数据是否返回
      let checkData = setInterval(() => {
        if(this.sourceUrl.length > 0) {
          this.playMusic()
          clearInterval(checkData)
          document.body.removeEventListener("click", playEvent)
        }
      }, 50)
    }
      document.body.addEventListener('click', playEvent)
  },

  methods: {
    ...mapActions({
      changeIndex: 'Music/changeIndex',
      musicSwich: 'Music/musicSwich',
      updateCurrentTime: 'Music/updateCurrentTime'
    }),

    selectMusic(index) {
      this.swichIndex(index)
    },

    handleMusicList() {
      this.musicList = !this.musicList
    },

    // 播放控制
    playMusic() {
      this.musicSwich(this.playStatus)
    },

    // 下一首（上一首）
    swichIndex(mark) {
      this.progressStyle.width = 0
      this.clickSwich = false

      this.musicSwich(true)

      this.$nextTick(() => {
        this.clickSwich = true
        this.changeIndex(mark)
        setTimeout(() => {
          this.playMusic()
        }, 100)
      })

    },

    //播放结束
    onEnded() {
      this.swichIndex('next')
    },

    //进度条更新
    timeUpdate() {
      this.updateCurrentTime(this.$refs.homeAudio.currentTime) // 派发当前时间

      this.duration = this.transTime(this.$refs.homeAudio.duration) // 音乐总时长
      let timeStr = parseInt(this.$refs.homeAudio.currentTime) // 音乐当前时间
      this.currentTime = this.transTime(timeStr)
      let scales = this.$refs.homeAudio.currentTime / this.$refs.homeAudio.duration // 计算出进度（百分之几）
      this.progressStyle.width = scales * 100 + '%'; // 进度条到达宽度
    },

    //鼠标点击移动播放进度
    controlAudioProgress(event) {
      let audio = this.$refs.homeAudio
      let audioProgress = this.$refs.audioProgress

      if (!audio.paused || audio.currentTime != 0) {
        let pgsWidth = parseFloat(window.getComputedStyle(audioProgress, null).width.replace('px', '')) // 计算总宽度
        let rate = event.offsetX / pgsWidth // 点击的长度 / 总长度 = 计算出的进度
        audio.currentTime = audio.duration * rate // 总时长 * 计算出的进度 => 赋值到当前时间
        this.timeUpdate() // 重新计算进度条
      }
    },

    //时间转换
    transTime(value) {
      let time = "";
      let h = parseInt(value / 3600);
      value %= 3600;
      let m = parseInt(value / 60);
      let s = parseInt(value % 60);
      if (h > 0) {
        time = this.formatTime(h + ":" + m + ":" + s);
      } else {
        time = this.formatTime(m + ":" + s);
      }
      return time;
    },

    //时间格式化
    formatTime(value) {
      let time = "";
      let s = value.split(':');
      let i = 0;
      for (; i < s.length - 1; i++) {
        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
        time += ":";
      }
      time += s[i].length == 1 ? ("0" + s[i]) : s[i];
      return time;
    }

  },

  watch: {
    playStatus: function(after) {
      let homeAudio = this.$refs.homeAudio
      if(after === true && homeAudio.paused === true) {
        homeAudio.play()
      } else if (after === false && homeAudio.paused === false) {
        homeAudio.pause()
      } else {
        return
      }
    }
  },
}
</script>

<style lang="scss" scoped>
#music {
  width: 14rem;
  margin-left: auto;
  position: relative;
  .music-player {
    color: #FFF;
    .icons-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .player-icon {
        fill: #FFF;
        width: 0.8rem;
        height: 0.8rem;
        cursor: pointer;
        transition: all .3s;
        margin-right: 1rem;
        &.play-list {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .player-icon:hover {
        fill: rgba(5, 180, 147, 1);
      }
    }
    .audio-progress {
      position: relative;
      height: 0.2rem;
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
      font-size: 0.8rem;
      &:hover {
        color: rgba(5, 180, 147, 1);
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
      font-size: 0.8rem;
      transition: all .3s;
      border-radius: 0.3rem;
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
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      margin-bottom: 0.3rem;
      position: sticky;
      top: 0;
      background: #fff;
      z-index: 1;
      box-shadow: 0 2px 6px #fff;
    }
  }
}
</style>
