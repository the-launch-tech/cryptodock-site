import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const { log, error } = console

export default (req, res, next) => {
  log('POST /users/login', req.user, req.body)

  global.User.single({ key: 'email', value: req.body.email }, (err, user) => {
    log('single', err, user)
    if (err) {
      return res.status(400).json({ message: 'USER_NOT_FOUND' })
    } else if (user) {
      bcrypt.compare(req.body.password, user.password).then(match => {
        if (match) {
          req.login(user, { session: false }, err => {
            if (err) {
              return res.status(400).json({ message: 'MATCH_ERROR' })
            }
            jwt.sign(
              {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                access_key: user.access_key,
                created: user.created,
              },
              'secret',
              { expiresIn: '1 week' },
              (err, token) => {
                log('signed', err, token, req.user)
                if (err) {
                  res.status(500).send({ message: 'TOKEN_ERROR' })
                } else {
                  res.status(200).json({ token })
                }
              }
            )
          })
        } else {
          return res.status(400).json({ message: 'BAD_CREDS' })
        }
      })
    }
  })

  // passport.authenticate('local-login', { session: false }, (err, user, info) => {
  //   if (err || !user) {
  //     return res.status(400).json({
  //       message: 'Something is not right',
  //       user: user,
  //     })
  //   }
  //
  //   req.login(user, { session: false }, err => {
  //     if (err) {
  //       res.send(err)
  //     }
  //
  //     jwt.sign(
  //       {
  //         id: user.id,
  //         first_name: user.first_name,
  //         last_name: user.last_name,
  //         email: user.email,
  //         access_key: user.access_key,
  //         created: user.created,
  //       },
  //       process.env.USER_SESSION,
  //       { expiresIn: '1 week' },
  //       (err, token) => {
  //         if (err) {
  //           res.status(500).send({ message: 'TOKEN_ERROR' })
  //         } else {
  //           res.status(200).json({ token })
  //         }
  //       }
  //     )
  //   })
  // })(req, res)
}
