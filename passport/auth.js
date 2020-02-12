import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwtStrategy from './jwtStrategy'
import loginStrategy from './loginStrategy'
import serializeUser from './serializeUser'
import deserializeUser from './deserializeUser'

const { log, error } = console

const config = { session: false }

export default () => {
  log('auth')

  serializeUser(passport)
  deserializeUser(passport)
  loginStrategy(passport)
  jwtStrategy(passport)

  return {
    initialize: () => {
      return passport.initialize()
    },
    session: () => {
      return passport.session()
    },
    authToken: (req, res, next) => {
      return passport.authenticate('jwt', { session: false })
    },
  }
}
