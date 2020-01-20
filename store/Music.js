export const state = ()=> {
  return {
    MusicList: [],
    playIndex: 0,
    playStatus: false,
    currentTime: 0
  }
}

export const actions =  {
  fetchMusicList({ commit }) {
    this.$axios.get('/Music/').then(res=> {
      commit('updateMusicList', res.data.data);
    }).catch(err => {
      console.log(err, '获取音乐列表错误')
    })
  },

  changeIndex({ commit }, mark) {
    commit('updateIndex' , mark)
  },

  musicSwich({commit}, status) {
    commit('changeSwich', status)
  },

  updateCurrentTime({commit}, payload) {
    commit('updateTime', payload)
  }
}

export const mutations =  {
  updateMusicList(state, data) {
    state.MusicList = data
  },

  updateIndex(state, mark) {
    if(mark === 'prev') {
      if(state.playIndex === 0) {
        state.playIndex = state.MusicList.length - 1
      } else {
        state.playIndex = state.playIndex - 1
      }

    } else {
      if(state.playIndex === state.MusicList.length - 1) {
        state.playIndex = 0
      } else {
        state.playIndex = state.playIndex + 1
      }
    }
  },

  changeSwich(state, status) {
    if (status) {
      state.playStatus = false
    } else {
      state.playStatus = true
    }
  },

  updateTime(state, payload) {
    state.currentTime = payload
  }
}
