export const state = ()=> {
  return {
    ArticleList: [],
  }
}

export const actions =  {
  fetchArticleList({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/Article/').then((res)=> {
        commit('updateArticleList', res.data.data);
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
}

export const mutations =  {
  // 文章列表
  updateArticleList(state, data) {
    state.ArticleList = data
  },
}
