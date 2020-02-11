const { log, error } = console

export default (req, res) => {
  log('GET /users/logout', req.user)

  if (req.user) {
    req.logout()
  }

  res.redirect(req.get('referer'))
}
