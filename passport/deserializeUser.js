const { log, error } = console

export default passport => {
  log('deserializeUser')

  passport.deserializeUser(async (id, done) => {
    const user = await global.User.single({ key: 'id', value: id })

    try {
      if (user) {
        return done(null, user)
      }
    } catch (err) {
      done(err)
    }
  })
}
