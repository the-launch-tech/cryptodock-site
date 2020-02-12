import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const { log, error } = console

export default passport => {
  log('jwt')

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: req => req.cookies.cryptodockJwt,
        secretOrKey: process.env.SECRET,
      },
      (jwtPayload, done) => {
        log('jwtPayload', jwtPayload)

        if (Date.now() > jwtPayload.expires) {
          return done('EXPIRED')
        }

        return done(null, jwtPayload)
      }
    )
  )
}
