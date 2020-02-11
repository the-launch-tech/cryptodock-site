const { log, error } = console

export default (req, res, User) => {
  log('GET /users/current', req.user, req.headers, req.session)

  res.status(200).send(req.user)
}
