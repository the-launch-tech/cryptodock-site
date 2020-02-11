const { log, error } = console

export default (req, res) => {
  log('GET /users/current', req.user)

  res.status(200).send(req.user)
}
