import bcrypt from 'bcryptjs'
import { Strategy } from 'passport-local'

const { log, error } = console

export default passport => {
  log('local-login')

  passport.use(
    'local-login',
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
            bcrypt.compare(password, user.password).then(match => {
              if (match) {
                return done(null, user)
              } else {
                return done(err)
              }
            })
          }
        })
      }
    )
  )
}
