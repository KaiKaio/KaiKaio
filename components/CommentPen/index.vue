<template>
  <div class="pen">
    <div class="markdown">
      <div
        ref="input"
        class="markdown-input"
        :contenteditable="!disabled"
        :placeholder="'请输入'"
        @keyup="handleInputChange"
      />
      <transition name="module">
        <div v-if="enabledPreviewMode" class="markdown-preview" v-html="previewContent" />
      </transition>
    </div>
    <div class="pencilbox">
      <div class="stationery" :class="{ disabled: disabled }">
        <a href class="emoji" title="Emoji" @click.stop.prevent>
          <svg class="icon" aria-hidden="true">
            <title>Emoji</title>
            <use xlink:href="#icon-emoji" />
          </svg>
          <div class="emoji-box">
            <ul class="emoji-list">
              <li
                v-for="(emoji, index) in EMOJI"
                :key="index"
                class="item"
                @click="insertEmoji(emoji)"
                v-text="emoji"
              />
            </ul>
          </div>
        </a>
        <a href class="image" title="Image" @click.stop.prevent="insertImage">
          <svg class="icon" aria-hidden="true">
            <title>Image</title>
            <use xlink:href="#icon-image" />
          </svg>
        </a>
        <a href class="link" title="Link" @click.stop.prevent="insertLink">
          <svg class="icon" aria-hidden="true">
            <title>Link</title>
            <use xlink:href="#icon-link" />
          </svg>
        </a>
        <a href class="code" title="Code" @click.stop.prevent="insertCode">
          <svg class="icon" aria-hidden="true">
            <title>Code</title>
            <use xlink:href="#icon-code" />
          </svg>
        </a>
        <a href class="preview" title="Preview" @click.stop.prevent="handleTogglePreviewMode">
          <svg class="icon" aria-hidden="true">
            <title>Preview</title>
            <use xlink:href="#icon-preview" />
          </svg>
        </a>
      </div>
      <button
        type="submit"
        class="submit"
        :disabled="disabled"
        @click="handleSubmit"
      >提交</button>
    </div>
  </div>
</template>

<script>
  import { markdownToHTML } from '@/plugins/marked'

  export default {
    name: 'CommentPen',
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isPosting: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        enabledPreviewMode: false,
        content: '',
        EMOJI: ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱', '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊', '🇨🇳', '🇺🇸', '🇯🇵 ', '🚩', '🐶', '❤️', '💔', '💩', '👻']
      }
    },
    computed: {
      previewContent() {
        return this.enabledPreviewMode
          ? markdownToHTML(this.content)
          : null
      }
    },
    methods: {
      focusPosition(position = 0) {
        const input = this.$refs.input
        input.focus()
        // 首位
        if (!position) {
          const range = window.getSelection().getRangeAt(0)
          const clone = range.cloneRange()
          clone.selectNodeContents(input)
          clone.setEnd(range.endContainer, range.endOffset)
          return clone.toString().length
        }

        // 指定位置
        let length = 0
        let abort = false
        const visit = parentNode => {
          const nodes = parentNode.childNodes
          for (let i = 0; i < nodes.length; ++i) {
            const node = nodes[i]
            const isNewLine = node.nodeType === 1 && node.tagName === 'BR'
            // 文本节点且不是换行
            if (node.nodeType !== 3 && !isNewLine) {
              visit(node)
              return
            }

            length += isNewLine ? 1 : node.textContent.length
            if (length >= position) {
              if (abort) {
                visit(node)
                return
              }

              abort = true
              const selection = document.getSelection()
              const range = document.createRange()
              const sub = length - node.textContent.length
              range.setStart(node, position - sub)
              range.setEnd(node, position - sub)
              selection.removeAllRanges()
              selection.addRange(range)
              break
            }
          }
        }

        visit(input)
      },
      getInputText() {
        return this.$refs.input.innerText
      },
      setInputText(content) {
        this.$refs.input.innerText = content
      },
      insertContent([start = '', end = '']) {
        if (!start && !end) {
          return false
        }

        // 如果选中了内容，则把选中的内容替换，
        const currentText = this.getInputText()
        const selection = (window.getSelection || document.getSelection)()
        const selectedText = selection.toString()
        if (selectedText) {
          // TODO: 正则可能会匹配到重复的前面的字符，故不可靠
          // 替换所有选中文本 -> 然后定位到所替换文本的最后一个字符
          // 对于选中逻辑来说，既定的任何单个字符都理解为替换
          const isInsertReplace = !!start && !end
          const newSelectedText = isInsertReplace ? start : start + selectedText + end
          const newText = currentText.replace(selectedText, newSelectedText)
          // console.log('选中插入', newText)
          this.setInputText(newText)
          this.focusPosition(newText.indexOf(newSelectedText) + newSelectedText.length - 1)
        } else {
          // 否则追加新内容
          const newInsertText = start + end
          const selectedRange = (() => {
            // eslint-disable-next-line no-empty
            try { return selection.getRangeAt(0) } catch(error) {}
          })()
          const startPoint = selectedRange && selectedRange.startOffset
          const endPoint = selectedRange && selectedRange.endOffset
          if (selectedRange && startPoint === endPoint && startPoint > 0) {
            // 若拿到了光标，则在光标位置插入新内容 -> 然后定位到新内容的最后一个字符
            const newTexts = [currentText.slice(0, startPoint), newInsertText, currentText.slice(startPoint)]
            // console.log('光标插入', startPoint, newTexts)
            this.setInputText(newTexts.join(''))
            this.focusPosition(newTexts[0].length + newTexts[1].length - 1)
          } else {
            // 否则末端追加内容，并定位到最后一个字符
            const newText = currentText + newInsertText
            // console.log('尾部插入', newText)
            this.setInputText(newText)
            this.focusPosition(newText.length - 1)
            this.$refs.input.scrollTop = this.$refs.input.scrollHeight
          }
        }

        this.handleInputChange()
      },
      insertEmoji(emoji) {
        this.insertContent([` ${emoji} `])
      },
      insertImage() {
        this.insertContent([` ![`, `](https://) `])
      },
      insertLink() {
        this.insertContent([` [`, `](https://) `])
      },
      insertCode() {
        this.insertContent(['\n```javascript\n', '\n```\n'])
      },
      handleTogglePreviewMode() {
        this.enabledPreviewMode = !this.enabledPreviewMode;
      },
      handleInputChange() {
        const text = this.getInputText()
        if (text !== this.content) {
          this.content = text
          this.$emit('input', text)
        }
      },
      handleSubmit(event) {
        event.preventDefault()
        this.$emit('submit', this.content)
      },

      clearContent() {
        this.content = ''
        this.$refs.input.innerText = ''
      }
    },
    watch: {
      value(newContent) {
        if (newContent !== this.content) {
          this.setInputText(newContent)
          this.content = newContent
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pen {
    position: relative;
    .markdown {
      position: relative;
      overflow: hidden;

      > .markdown-input {
        min-height: 6em;
        max-height: 36em;
        overflow: auto;
        outline: none;
        padding: .5em;
        cursor: auto;
        font-size: $font-size-h6;
        line-height: 1.8em;
        background-color: $module-hover-bg;
        @include background-transition();

        &:empty:before {
          content: attr(placeholder);
          color: $text-disabled;
        }

        &:focus {
          content:none;
        }

        &:hover {
          background-color: $module-hover-bg-darken-10;
        }
      }

      > .markdown-preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        margin: 0;
        padding: .5em;
        background-color: $body-bg;
      }
    }

    .pencilbox {
      $size: $font-size-base * 2;
      height: $size;
      line-height: $size;
      display: flex;
      justify-content: space-between;
      background-color: $module-hover-bg-opacity-9;

      .stationery {
        &.disabled {
          opacity: .7;
          pointer-events: none;
        }

        > .emoji,
        > .image,
        > .link,
        > .code,
        > .preview {
          width: $size;
          height: $size;
          text-align: center;
          display: inline-block;
          @include background-transition();

          &:hover {
            background-color: $module-hover-bg-darken-20;
          }
        }

        > .emoji {
          .emoji-box {
            display: none;
            position: absolute;
            bottom: $size;
            left: 0;
            top: 0;
            width: 100%;
            overflow-y: auto;
            background-color: $module-bg;

            > .emoji-list {
              list-style: none;
              padding: 0;
              margin: 0;
              font-size: $font-size-h3;
              display: flex;
              flex-wrap: wrap;

              > .item {
                padding: 0 .4em;
                cursor: pointer;
                @include background-transition();

                &:hover {
                  background-color: $module-hover-bg;
                }
              }
            }
          }

          &:hover {
            > .emoji-box {
              display: block;
            }
          }
        }
      }

      > .submit {
        width: 8rem;
        height: $size;
        background-color: $module-hover-bg-darken-20;
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg-darken-40;
        }
      }
    }
  }
</style>
