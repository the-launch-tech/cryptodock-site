const { log, error } = console

export default passport => {
  log('serializeUser')

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
}
