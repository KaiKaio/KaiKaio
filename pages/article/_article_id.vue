<template>
  <article id="article" class="article">
    <div class="article-detail">
      <h1 class="article-title">{{ articleList[index].title }}</h1>
      <div class="article-content">
        {{ articleList[index].content }}
      </div>
    </div>
  </article>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "ArticleDetail",
  data() {
    return {
      index: this.$route.params.article_id,
    }
  },
  computed: {
    ...mapState({
      articleList: state => state.Article.ArticleList
    }),
  },

};
</script>

<style lang="scss">
#article {
  .article-detail {
    color: #666;
    background-color: #FFF;
    opacity: 0.8;
    padding: 12px 12px;
    h1.article-title {
      font-size: 24px;
      line-height: inherit;
      margin: 0px 0px 10px;
    }
    .article-content {
      line-height: 34px;
    }
  }
}
</style>
