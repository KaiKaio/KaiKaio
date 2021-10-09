/**
 * @file App入口
 * @lastModifiedTime 2019-10-28 17:19:13
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const Koa = require('koa')
const consola = require('consola')
const requireESM = require('esm')(module)
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

const config = requireESM('../nuxt.config.js').default
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 5000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
