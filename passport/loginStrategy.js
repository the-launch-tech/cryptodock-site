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
      async (req, email, password, done) => {
        const user = await global.User.single({ key: 'email', value: email })

        const match = await bcrypt.compare(password, user.password)

        try {
          if (match) {
            return done(null, user)
          } else {
            return done('BAD_CREDS')
          }
        } catch (err) {
          done(err)
        }
      }
    )
  )
}
