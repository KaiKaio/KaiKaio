<template>
  <div id="article-list">
    <div class="article-list-item" v-for="(item, index) in articleList" :key=item.id>
      <div class="item-image"
        :style="{ backgroundImage: `url(${item.cover})`,}">
      </div>
      <div class="item-text-content">
        <h5 class="item-title">
          <nuxt-link :to="`/article/${index}`" :title="item.title" v-text="item.title" />
        </h5>
        <div class="item-content">{{ item.description }}</div>
        <div class="item-create-time">
          <svg class="icon date" aria-hidden="true">
            <use xlink:href="#icon-time" />
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
  .article-list-item {
    color: #666;
    background-color: rgba($color: #fff, $alpha: 0.8);
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item-title {
        transition: all .3s;
        display: inline-block;
        text-decoration: none;
        color: inherit;
        margin-top: 3px;
        margin-bottom: .618rem;
        font-weight: 700;
        color: var(--link-color-hover);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-content {
        height: 3rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        overflow: hidden;
        font-size: $font-size-h6;
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
      background-size : 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .article-list-item:hover {
    background-color: rgba($color: #fff, $alpha: 0.9);
    .item-image {
      background-size : 105%;
    }
    .item-title {
      margin-left: 10px;
      color: #000;
      text-decoration:underline;
    }
  }
}
</style>
