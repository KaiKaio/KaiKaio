<template>
  <article id="article" class="article">
    <div class="article-detail">
      <div class="article-content" v-html="parseContent"></div>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import marked from 'marked'

export default {
  name: "ArticleDetail",
  data() {
    return {
      index: this.$route.params.article_id,
      parseContent: ''
    }
  },

  computed: {
    ...mapState({
      articleList: state => state.Article.ArticleList
    }),
  },

  mounted() {
    if(this.articleList.length > 0) {
      this.parseMarkdown()
    } else {
      this.fetchArticleList().then(res => {
        this.parseMarkdown()
      })
    }

  },

  methods: {
    ...mapActions({
      fetchArticleList: 'Article/fetchArticleList'
    }),

    parseMarkdown() {
      this.parseContent = marked(this.articleList[this.index].content)
    }
  }

};
</script>

<style lang="scss">
#article {
  margin-top: 1rem;
  .article-detail {
    color: #555;
    background-color: #FFF;
    opacity: 0.9;
    transition: all .3s;
    .article-content {
      padding: 12px 12px;
      font-size: 1.4rem;
      line-height: 2;
      h1,h2,h3,h4,h5,h6 {
        padding: 0;
        margin: 0 0 1.68rem;
        font-weight: 600;
        text-indent: 0;
      }
      h1,h2 {
        border-bottom: 1px solid #e2e2e2;
      }
      h1 {
        font-size: 2.8rem;
      }
      h2 {
        font-size: 2.4rem;
      }
      h3 {
        font-size: 2rem;
      }
      ul, ol {
        margin-bottom: 1rem;
        padding-left: 3rem;
      }
      p {
        line-height: 3rem;
        text-indent: 2.8rem;
        margin-bottom: 1.4rem;
        font-size: 1.4rem;
      }
      img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        margin-bottom: 1rem;
      }

      a {
        font-weight: bold;
        margin: 0 .2rem;
      }

      code {
        padding: 0.2em 0.4em;
        margin: 0;
        background-color: #fff5f5;
        color: #ff502c;
      }
      .article-content {
        line-height: 34px;
      }
    }
  }
}
</style>
