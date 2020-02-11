import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const { log, error } = console

export default passport => {
  log('jwt')

  return passport.use(
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
}
