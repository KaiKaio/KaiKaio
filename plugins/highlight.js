const highlightjs = require('highlight.js/lib/highlight')

highlightjs.registerLanguage('css', require('highlight.js/lib/languages/css'))
highlightjs.registerLanguage('json', require('highlight.js/lib/languages/json'))
highlightjs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
highlightjs.registerLanguage('less', require('highlight.js/lib/languages/less'))
highlightjs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
highlightjs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
highlightjs.registerLanguage('python', require('highlight.js/lib/languages/python'))
highlightjs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
highlightjs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))

export default highlightjs
