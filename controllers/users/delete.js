const { log, error } = console

export default async (req, res) => {
  log('DELETE /users/delete', req.params)

  const data = await global.User.delete(req.params.id)

  try {
    return res.status(200).json({ message: 'USER_DELETED' })
  } catch (err) {
    res.status(500).send({ message: 'REQUEST_ERROR' })
  }
}
