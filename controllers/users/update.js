const { log, error } = console

export default async (req, res) => {
  log('UPDATE /users/update', req.params, req.body, req.user)

  const data = await global.User.update(req.params.id, req.body.fields)

  try {
    return res.status(200).json(data)
  } catch (err) {
    res.status(500).send({ message: 'UNABLE_TO_UPDATE' })
  }
}
