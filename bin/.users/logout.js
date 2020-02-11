const { log, error } = console

export default (req, res, User) => {
  log('POST /users/logout', req.user)

  if (req.user) {
    req.logout()
  }

  res.redirect(req.get('referer'))
}
