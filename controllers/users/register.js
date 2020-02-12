import bcrypt from 'bcryptjs'

const { log, error } = console

export default async (req, res) => {
  log('POST /users/register', req.body, req.cookies)

  const user = await global.User.single({ key: 'email', value: req.body.email })

  try {
    if (user) {
      return res.status(400).json({ message: 'USER_EXISTS' })
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
          bcrypt.hash(req.body.password, salt, (err, pw) => {
            if (!err) {
              try {
                global.User.save(req.body, pw)
                  .then(id => {
                    const newUser = req.body
                    newUser.password = pw
                    newUser.id = id
                    return res.json(newUser)
                  })
                  .catch(e => res.status(400).json({ message: 'SAVE_ERROR' }))
              } catch (err) {
                return res.status(400).json({ message: 'SAVE_ERROR' })
              }
            } else {
              return res.status(400).json({ message: 'HASH_ERROR' })
            }
          })
        }
      })
    }
  } catch (err) {
    res.status(400).json({ message: 'REGISTER_ERROR' })
  }
}
