const { log, error } = console

export default (req, res, User) => {
  log('UPDATE /users/update', req.params, req.body)

  User.update(req.params.id, req.body.fields, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'UNABLE_TO_UPDATE' })
    } else {
      res.status(200).json(data)
    }
  })
}
