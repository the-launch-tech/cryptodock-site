require('dotenv').config()

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import proxy from 'express-http-proxy'
import { Provider } from 'react-redux'
import App from './client/App'
import html from './html'
import routes from './routes'
import getVars from './client/utils/getVars'
import createStore from './helpers/createStore'

const { log, error } = console
const vars = getVars()
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

app.get('*', async (req, res) => {
  const store = createStore(req)

  const promises = await Promise.all(
    routes
      .filter(route => matchPath(req.url, route))
      .filter(route => route.loadData)
      .map(route => route.loadData(store, req.path))
  )

  try {
    const context = {}

    const jsx = (
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    )

    const body = ReactDOMServer.renderToString(jsx)
    const title = 'CryptoDock'
    const helmet = Helmet.renderStatic()
    const content = html({ title, body, helmet, store })

    if (context.url) {
      return res.redirect(301, context.url)
    }

    if (context.notFound) {
      res.status(404)
    }

    res.send(content)
  } catch (err) {
    throw err
  }
})

http.listen(vars.port, () => log('Served Client'))
