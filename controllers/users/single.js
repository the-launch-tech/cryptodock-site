const { log, error } = console

export default (req, res) => {
  log('GET /users/:id', req.params)

  global.User.single({ key: 'id', value: req.params.id }, (err, data) => {
    if (err || !data) {
      res.status(500).send({ msg: 'USER_NOT_FOUND' })
    } else {
      res.status(200).json(data)
    }
  })
}
