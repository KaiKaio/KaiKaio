export const state = () => {
  return {
    isHideTool: false,
  }
}

export const actions =  {
  setIsHideToolAction({commit}, payload) {
    commit('setIsHideTool', payload)
  }
}

export const mutations =  {
  setIsHideTool(state, payload) {
    state.isHideTool = payload
  },
}
