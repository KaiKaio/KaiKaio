import { marked } from 'marked'
import hljs from 'highlight.js'

const renderer = new marked.Renderer()

renderer.heading = (text: string, level: number, raw: string) => {
  const id = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
  return `<h${level} id="${id}" alt="${id}" title="${id}">${text}</h${level}>`
}

renderer.link = (href: string | null, title: string | null | undefined, text: string) => {
  const isSelf = href?.includes('kaikaio.com')
  const textIsImage = text.includes('<img')
  const linkTitle = title || (textIsImage ? href : text)
  return `
    <a 
      href="${href || ''}" 
      target="_blank" 
      class="${textIsImage ? 'image-link' : 'link'}"
      title="${linkTitle || ''}"
      ${!isSelf ? 'rel="external nofollow noopener"' : ''}
    >
      ${text}
    </a>
  `.replace(/\s+/g, ' ').trim()
}

renderer.image = (src: string | null, title: string | null | undefined, alt: string | null | undefined) => {
  return `
    <img 
      data-src="${src || ''}" 
      src="${src || ''}" 
      title="${title || alt || ''}" 
      alt="${alt || title || src || ''}" 
      onclick="window.$popup && window.$popup.vImage('${src || ''}')"
    />
  `.replace(/\s+/g, ' ').trim()
}

renderer.code = function(code: string, lang: string | undefined) {
  const highlighted = lang && hljs.getLanguage(lang) 
    ? hljs.highlight(code, { language: lang }).value 
    : hljs.highlightAuto(code).value
  
  const lineNumbers = code
    .split('\n')
    .map((_, i) => `<li class="code-line-number">${i + 1}</li>`)
    .join('')
  
  const readOnlyAttrs = `
    contenteditable="true"
    oncut="return false"
    onpaste="return false"
    onkeydown="if(event.metaKey) return true; return false;"
  `.trim()
  
  if (lang) {
    return `
      <pre data-lang="${lang}">
        <ul class="code-lines">${lineNumbers}</ul>
        <code ${readOnlyAttrs} class="hljs language-${lang}">${highlighted}\n</code>
      </pre>
    `.trim()
  }
  
  return `
    <pre>
      <ul class="code-lines">${lineNumbers}</ul>
      <code ${readOnlyAttrs} class="hljs">${highlighted}\n</code>
    </pre>
  `.trim()
}

marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false,
  smartLists: true,
  renderer
})

export const markdownToHTML = (markdown: string): string => {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }
  return marked(markdown) as string
}
