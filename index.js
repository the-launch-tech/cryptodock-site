require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import { Conn as Connection } from 'the_launch-mysql-layer'
import models from './models/index'
import routes from './routes/index'
import getVars from './utils/getVars'
import setHeaders from './middleware/setHeaders'
import auth from './passport/auth'

const { log, error } = console

const { NODE_ENV, PORT, HOST, DB_NAME, DB_USER, DB_HOST, DB_PASSWORD } = getVars()

const CryptoDock = express()

const Conn = new Connection({
  hostname: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
})

models(Conn)

const authed = auth()

CryptoDock.use(bodyParser.json({ limit: '500mb' }))
CryptoDock.use(bodyParser.urlencoded({ limit: '500mb', extended: false }))
CryptoDock.use(bodyParser.raw({ limit: '500mb', inflate: true, parameterLimit: 100000 }))
CryptoDock.use(cookieParser())
CryptoDock.use(setHeaders)
CryptoDock.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: ['secret'] }))
CryptoDock.use(authed.initialize())
CryptoDock.use(authed.session())

routes(CryptoDock, authed)

CryptoDock.listen(PORT, () => {
  log(`SERVER: http://${HOST}:${PORT}`)
})
