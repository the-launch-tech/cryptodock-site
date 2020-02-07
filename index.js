require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import cookieSession from 'cookie-session'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Conn } from 'the_launch-mysql-layer'
import getVars from './utils/getVars'

const { log, error } = console
const { NODE_ENV, DB_NAME, DB_USER, DB_HOST, DB_PASSWORD, PORT, HOST, SESSION } = getVars()

const Connection = new Conn({
  hostname: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
})

const CryptoDock = express()
CryptoDock.use(cors())
CryptoDock.use(bodyParser.json({ limit: '500mb' }))
CryptoDock.use(bodyParser.urlencoded({ limit: '500mb', extended: false }))
CryptoDock.use(bodyParser.raw({ limit: '500mb', inflate: true, parameterLimit: 100000 }))
CryptoDock.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [SESSION] }))

CryptoDock.get('/users/:id', (req, res) => {
  log('GET /users/:id')

  Connection.asyncQuery('SELECT * FROM users WHERE id=?', [req.query.id])
    .then(data => {
      if (data[0]) {
        res.json({ user: data[0] })
      } else {
        res.status(500).send({ msg: 'Error Getting User!' })
      }
    })
    .catch(err => res.status(500).send({ msg: 'Error Getting User!' }))
})

CryptoDock.post('/users/register', (req, res) => {
  log('POST /users/register')

  Connection.asyncQuery('SELECT email FROM users WHERE email=? LIMIT 1', [req.body.email])
    .then(users => {
      if (Object.keys(users[0])) {
        res.status(500).send({ message: 'ALREADY_EXISTS' })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (!err)
            bcrypt.hash(req.body.password, salt, (err, pw) => {
              if (!err) {
                try {
                  Connection.asyncQuery(
                    'INSERT INTO users (first_name, last_name, email, password, key) values (?,?,?,?,?)',
                    [req.body.firstName, req.body.lastName, req.body.email, pw, req.body.key]
                  )
                    .then(newUser => res.json({ id: newUser.inserId }))
                    .catch(err => res.status(500).send({ message: err }))
                } catch (err) {
                  res.status(500).send({ message: err })
                }
              }
            })
        })
      }
    })
    .catch(err => res.status(500).send({ message: err }))
})

CryptoDock.post('/users/login', (req, res) => {
  log('POST /users/login')

  Connection.asyncQuery('SELECT * FROM users WHERE email=? LIMIT 1', [req.body.email]).then(
    users => {
      const user = users[0] ? users[0] : false
      if (!user) {
        res.status(500).send({ message: 'NOT_EXISTS' })
      } else {
        bcrypt.compare(req.body.password, user.password).then(match => {
          if (match) {
            jwt.sign(
              {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                key: user.key,
                created: user.created,
              },
              'secret',
              { expiresIn: '1 week' },
              (err, token) => {
                if (err) {
                  res
                    .status(500)
                    .send({ message: 'There is some error in token! Stacktrace:' + err + '.' })
                } else {
                  res.json({ user: token })
                }
              }
            )
          } else {
            res.status(500).send({ message: 'Unable To Login' })
          }
        })
      }
    }
  )
})

CryptoDock.put('/users/update', (req, res) => {
  log('UPDATE /users/update')

  let query = 'UPDATE users SET '
  let bindings = []
  let fields = []

  Object.keys(req.body.fields).map((key, i) => {
    fields.push(key)
    bindings.push(req.body.fields[key])
    query += ' ' + key + '=? '
    if (i >= Object.keys(req.body.fields).length - 1) {
      query += ', '
    }
  })

  query += 'WHERE id=?'
  bindings.push(req.body.id)

  Connection.asyncQuery(query, bindings)
    .then(data => res.json({ user: data }))
    .catch(err => res.status(500).send({ message: 'Error Updating User' }))
})

CryptoDock.post('/users/logout', (req, res) => {
  log('POST /users/logout')

  if (req.user) req.logout()
  res.redirect(req.get('referer'))
})

CryptoDock.delete('/users/delete/:id', (req, res) => {
  log('DELETE /users/delete')

  Connection.asyncQuery('DELETE FROM users WHERE id=?', [req.query.id])
    .then(data => res.json({ user: data }))
    .catch(err => res.status(500).send({ message: 'Unable To Login' }))
})

CryptoDock.listen(PORT, () => {
  log(`SERVER: Listening On ${PORT} FROM ${HOST}.`)
})
