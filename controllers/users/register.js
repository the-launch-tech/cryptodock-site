import bcrypt from 'bcryptjs'

const { log, error } = console

export default (req, res) => {
  log('POST /users/register', req.body)

  global.User.single({ key: 'email', value: req.body.email }, (err, user) => {
    log('single', err, user)
    if (err) {
      return res.status(400).json({ message: 'REGISTER_ERROR' })
    } else if (user) {
      return res.status(400).json({ message: 'USER_EXISTS' })
    } else {
      log('salting')
      bcrypt.genSalt(10, (err, salt) => {
        log(err, salt)
        if (!err) {
          log('hashing')
          bcrypt.hash(req.body.password, salt, (err, pw) => {
            log(err, pw)
            if (!err) {
              log('saving')
              try {
                global.User.save(req.body, pw, (err, id) => {
                  log('global.User.save')
                  if (err) {
                    return res.status(400).json({ message: 'SAVE_ERROR' })
                  } else {
                    const newUser = req.body
                    newUser.password = pw
                    newUser.id = id
                    log('newUser', newUser)
                    return res.json(newUser)
                  }
                })
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
  })
}
