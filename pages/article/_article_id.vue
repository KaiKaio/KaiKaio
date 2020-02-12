<template>
  <article id="article" class="article">
    <div class="article-detail">
      <h1 class="article-title">{{ title }}</h1>
      <img class="article-cover" :src="cover" alt="文章封面">
      <div class="article-content" v-html="parseContent"></div>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import marked from 'marked'
import highlightjs from '@/plugins/highlight'
import 'highlight.js/styles/atelier-plateau-light.css';

export default {
  name: "ArticleDetail",
  head() {
    return {
      title: `文章 | KaiKaio`
    }
  },
  data() {
    return {
      index: this.$route.params.article_id,
      parseContent: '',
      title: '',
      cover: ''
    }
  },

  computed: {
    ...mapState({
      articleList: state => state.Article.ArticleList
    }),
  },

  mounted() {
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code) {
          return highlightjs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      }
    );

    if(this.articleList.length > 0) {
      this.title = this.articleList[this.index].title
      this.cover = this.articleList[this.index].cover
      // this.parseMarkdown()
      this.parseContent = marked(this.articleList[this.index].content)
    } else {
      this.fetchArticleList().then(res => {
        this.title = this.articleList[this.index].title
        this.cover = this.articleList[this.index].cover
        // this.parseMarkdown()
        this.parseContent = marked(this.articleList[this.index].content)
      })
    }
  },

  methods: {
    ...mapActions({
      fetchArticleList: 'Article/fetchArticleList'
    }),

    parseMarkdown() {
      // this.parseContent = marked(this.articleList[this.index].content)
    }
  },
};
</script>

<style lang="scss">
#article {
  .article-detail {
    color: #555;
    background-color: #FFF;
    opacity: 0.9;
    transition: all .3s;
    padding: 1rem 1rem;
    > img.article-cover {
      margin: 0rem auto 1rem;
      height: 10rem;
      display: block;
      text-align: center;
      border-radius: 2px;
      border: 0.4rem solid hsla(0,0%,77.3%,0.5);
      opacity: .9;
      cursor: pointer;
    }

    > h1.article-title {
      font-size: 1.8rem;
      text-align: center;
    }
    .article-content {
      font-size: 0.845rem;
      font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
      line-height: 2;
      h1,h2,h3,h4,h5,h6 {
        padding: 0;
        margin: 0 0 0.8rem;
        font-weight: 600;
        text-indent: 0;
      }
      h1,h2 {
        border-bottom: 1px solid #e2e2e2;
      }
      ul, ol {
        padding-left: 1.2rem;
      }
      img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        margin-bottom: 1rem;
      }
      code {
        padding: 0.2em 0.4em;
        margin: 0;
        color: #c7254e;
        background-color: #f9f2f4;
        border-radius: 3px;
      }
      pre {
        padding: 0.6em;
        overflow: auto;
        line-height: 1.6;
        background-color: #f0f0f0;
        border-radius: 3px;
        > code {
          padding: 0;
          margin: 0;
          font-size: 100%;
          background: transparent;
          color: inherit;
        }
      }
      hr {
        height: 1px;
        background: #dadada;
        border: none;
      }
      a {
        font-weight: bold;
        margin: 0 .2rem;
        color: #0366d6;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      table {
        width: 100%;
        border: 1px solid #ddd;
        margin-bottom: 0.6em;
        border-collapse: collapse;
        text-align: left;
        thead {
          background: #eee;
        }
        th,td {
          padding: 0.1em 0.4em;
          border: 1px solid #ddd;
        }
        th {
          text-align: inherit;
        }
      }
      blockquote {
        margin: 0;
        padding: 0 1em;
        color: #6a737d;
        border-left: 0.25em solid #dfe2e5;
        background-color: rgba(102,128,153,0.05);
      }
      p,hr,blockquote,ul,ol,dl,pre {
        margin-bottom: .6em;
      }
    }
  }
}
</style>
