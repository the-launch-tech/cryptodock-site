import bcrypt from 'bcryptjs'
import { Strategy } from 'passport-local'

const { log, error } = console

export default passport => {
  log('local-register')

  passport.use(
    'local-register',
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        global.User.single({ key: 'email', value: email }, (err, user) => {
          if (err) {
            return done(err)
          } else if (user) {
            return done(err)
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              if (!err) {
                bcrypt.hash(password, salt, (err, pw) => {
                  if (!err) {
                    try {
                      global.User.save(req.body, pw, (err, id) => {
                        if (err) {
                          return done(err)
                        } else {
                          const newUser = req.body
                          newUser.password = pw
                          newUser.id = id
                          return done(null, newUser)
                        }
                      })
                    } catch (err) {
                      return done(err)
                    }
                  } else {
                    return done(err)
                  }
                })
              }
            })
          }
        })
      }
    )
  )
}
