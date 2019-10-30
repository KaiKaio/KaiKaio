export const state = ()=> {
  return {
    ArticleList: [],
  }
}

export const actions =  {
  fetchArticleList({ commit }) {
    this.$axios.get('/Article/').then((res)=> {
      commit('updateArticleList', res.data.data);
    })
  },
}

export const mutations =  {
  // 文章列表
  updateArticleList(state, data) {
    state.ArticleList = data
  },
}
