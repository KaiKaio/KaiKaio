<template>
  <div id="article-list">
    <div class="article-list-item" v-for="(item, index) in articleList" :key=item.id>
      <div class="item-image"
        :style="{ backgroundImage: 'url(/testimages/test.jpeg)',}">
      </div>
      <div class="item-text-content">
        <nuxt-link class="item-title" :to="`/article/${index}`" :title="item.title" v-text="item.title" />
        <div class="item-content">{{ item.description }}</div>
        <div class="item-create-time">
          <svg class="icon date" aria-hidden="true">
            <use xlink:href="#icon-md-shijian" />
          </svg>
          {{ item.createtime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArticleList',

  computed: {
    ...mapState({
      articleList: state => state.Article.ArticleList
    }),
  },

  mounted() {
    this.$store.dispatch('Article/fetchArticleList')
  },
}
</script>

<style lang="scss">
#article-list {
  width: 50%;
  .article-list-item {
    color: #666;
    background-color: #FFF;
    opacity: 0.8;
    padding: 6px;
    height: 100px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 18px;
    transition: all .3s;
    .item-text-content {
      width: calc(65% - 12px);
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item-title {
        transition: all .3s;
        font-size: 16px;
        display: inline-block;
        text-decoration: none;
        color: inherit;
        &:hover {
          margin: 0px 0px 0px 10px;
          color: #000;
          text-decoration:underline;
        }
      }
      .item-content {
        height: 3rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      > .item-create-time {
        > .icon.date {
          width: 1.1rem;
          height: 1.1rem;
        }
      }
    }
    .item-image {
      transition: all .3s;
      width: 35%;
      height: 100%;
      background-size : 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .article-list-item:hover {
    opacity: 0.9;
    .item-image {
      background-size : 105% 105%;
    }
  }
}
</style>
