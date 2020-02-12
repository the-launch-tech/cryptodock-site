const { log, error } = console

export default async (req, res) => {
  log('GET /users/:id', req.params)

  const data = await global.User.single({ key: 'id', value: req.params.id })

  try {
    if (!data) {
      return res.status(500).send({ msg: 'USER_NOT_FOUND' })
    } else {
      return res.status(200).json(data)
    }
  } catch (err) {
    res.status(500).send({ msg: 'USER_NOT_FOUND' })
  }
}
