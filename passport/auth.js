import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwtStrategy from './jwtStrategy'
import loginStrategy from './loginStrategy'
import registerStrategy from './registerStrategy'
import serializeUser from './serializeUser'
import deserializeUser from './deserializeUser'

const { log, error } = console

const config = { session: false }

export default () => {
  log('auth')

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    return global.User.single({ key: 'id', value: id }, (err, user) => {
      return done(err, user)
    })
  })

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
      },
      (jwtPayload, done) => {
        log('jwtPayload', jwtPayload)
        return global.User.single({ key: 'id', value: jwtPayload.id }, (err, data) => {
          if (error) {
            return done(err)
          }
          log(user)
          return done(null, user)
        })
      }
    )
  )

  return {
    initialize: () => {
      return passport.initialize()
    },
    session: () => {
      return passport.session()
    },
    authToken: (req, res, next) => {
      return passport.authenticate('jwt', config)
    },
  }
}
