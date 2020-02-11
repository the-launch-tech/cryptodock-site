const { log, error } = console

export default passport => {
  log('serializeUser')

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
}
