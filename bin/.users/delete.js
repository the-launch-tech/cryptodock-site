const { log, error } = console

export default (req, res, User) => {
  log('DELETE /users/delete', req.params)

  User.delete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'REQUEST_ERROR' })
    } else {
      res.status(200).json({ message: 'USER_DELETED' })
    }
  })
}
