const { log, error } = console

export default passport => {
  log('deserializeUser')

  passport.deserializeUser((id, done) => {
    global.User.single({ key: 'id', value: id }, (err, user) => {
      done(err, user)
    })
  })
}
