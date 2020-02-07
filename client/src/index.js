require('dotenv').config()

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Helmet } from 'react-helmet'
import proxy from 'express-http-proxy'
import App from './App'
import html from './html'

const { log, error } = console
const { NODE_ENV, HOST, PORT, SERVER_PORT, DEV_HOST, DEV_SERVER_PORT, DEV_PORT } = process.env

const vars = {
  host: NODE_ENV === 'development' ? DEV_HOST : HOST,
  srvport: NODE_ENV === 'development' ? DEV_SERVER_PORT : SERVER_PORT,
  port: NODE_ENV === 'development' ? DEV_PORT : PORT,
}

const app = express()
const http = require('http').createServer(app)

app.use(
  '/api',
  proxy(`${vars.host}:${vars.srvport}`, {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = `${vars.host}:${vars.port}`
      return opts
    },
  })
)

app.use(express.static('public'))

app.get('*', (req, res) => {
  const context = {}
  const jsx = <App />
  const body = ReactDOMServer.renderToString(jsx)
  const title = 'CryptoDock'
  const helmet = Helmet.renderStatic()
  const content = html({ title, body, helmet })

  if (context.url) {
    return res.redirect(301, context.url)
  }

  if (context.notFound) {
    res.status(404)
  }

  res.send(content)
})

http.listen(vars.port, () => log('Served Client'))
