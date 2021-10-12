<template>
  <div id="mood">
    <ul class="comment-list">
      <li
        v-for="comment in commentList"
        :id="`comment-item-${comment._id}`"
        :key="comment._id"
        class="comment-item"
      >
        <div class="comment-main">
          <div class="comment-header">
            <span class="user-name">{{comment.userName}}</span>
            <span class="location">
              <svg class="icon" aria-hidden="true">
                <title>Location</title>
                <use xlink:href="#icon-address" />
              </svg>
              <span>{{ comment.ip_location || '外太空~' }}</span>
            </span>
          </div>
          <div class="comment-content">
            <div v-html="marked(comment.content)"></div>
          </div>
          <div class="comment-footer">
            <svg class="icon" aria-hidden="true">
              <title>Location</title>
              <use xlink:href="#icon-time" />
            </svg>
            <span class="create_at">{{ comment.createDate }}</span>
          </div>
        </div>


        <CommentUa :ua="comment.agent" />
      </li>
    </ul>

    <div key="edit" class="user">
      <div class="name">
        <input
          v-model="user.userName"
          required
          type="text"
          name="name"
          autocomplete="on"
          :placeholder="'姓名' + ' *'"
        >
      </div>
      <div class="email">
        <input
          v-model="user.email"
          required
          type="email"
          name="email"
          autocomplete="on"
          :placeholder="'邮箱' + ' *'"
        >
      </div>
      <div class="site">
        <input
          v-model="user.site"
          type="url"
          name="url"
          autocomplete="on"
          :placeholder="'网址'"
        >
      </div>
    </div>
    <CommentPen @submit="submitComment" ref="commentPen" />

  </div>
</template>



<script>
import { markdownToHTML } from '@/plugins/marked'
import CommentUa from '@/components/CommentUa'
import CommentPen from '@/components/CommentPen'

export default {
  name: "Mood",
  components: {
    CommentPen,
    CommentUa,
  },
  head() {
    return {
      title: `短句 | KaiKaio`,
    }
  },

  data(){
    return {
      commentList: [],
      user: {
        userName: '',
        email: '',
        site: '',
      }
    }
  },

  mounted() {
    this.$axios.get('/Comment').then((res)=> {
      this.commentList = res.data.data;
    }).catch(err => {
      reject(err);
    })
  },

  methods: {
    marked(content) {
      return markdownToHTML(content)
    },

    submitComment(content) {
      const {
        userName,
        site,
        email
      } = this.user

      if (!userName) {
        alert('输一下名字吧，认识一下~')
        return
      }

      this.$axios.post('/Comment/Add', {
        agent: navigator.userAgent,
        content,
        agent: navigator.userAgent,
        userName,
        site,
        email
      }).then((res)=> {
        const { data } = res
        if (data.code !== 0) {
          return
        }
        this.commentList.push(data.result)
        this.user = {
          userName: '',
          email: '',
          site: '',
        }
        this.$refs.commentPen.clearContent()
      }).catch(err => {
        reject(err);
      })
    }
  }
};
</script>

<style lang="scss" scope>

#mood {
  padding: $gap;
  min-height: 800px;
  color: #555;
  background-color: rgba($color: #fff, $alpha: 0.9);
  .comment-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    margin-bottom: 1rem;
    .comment-item {
      display: flex;
      width: 100%;
      height: 100%;
      margin-bottom: $gap;
      padding: $sm-gap $sm-gap $sm-gap ($lg-gap * 1);
      background-color: $module-hover-bg;
      @include background-transition();
      .comment-main {
        flex: 1;
      }
      .agent {
        width: 130px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        margin-left: 20px;
        .browser {
          margin-top: 3px;
        }
      }
      .comment-header {
        display: flex;
        align-items: center;
        width: 100%;
        .user-name {
          font-weight: bold;
          font-size: 16px;
        }
        .location {
          font-size: 14px;
          margin-left: 20px;
        }
      }

      .comment-content {
        margin: .618rem 0;
      }
    }
  }

  .user {
    width: 100%;
    height: 2em;
    line-height: 2em;
    display: flex;
    margin-bottom: $gap;
    > .name,
    > .email,
    > .site {
      flex-grow: 1;

      > input {
        width: 100%;
        height: 2em;
        line-height: 2em;
        text-indent: 3px;
        background-color: $module-hover-bg;
        @include background-transition();

        &:focus,
        &:hover {
          background-color: $module-hover-bg-darken-10;
        }
      }
    }

    > .name,
    > .email {
      margin-right: $gap;
    }
  }
}
</style>
