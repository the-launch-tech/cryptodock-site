import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { log, error } = console

export default (req, res, User) => {
  log('POST /users/register', req.body)

  User.single({ key: 'email', value: req.body.user.email }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'REQUEST_ERROR' })
    } else if (user) {
      res.status(500).send({ message: 'USER_EXISTS' })
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
          bcrypt.hash(req.body.user.password, salt, (err, pw) => {
            if (!err) {
              try {
                User.save(req.body.user, pw, (err, id) => {
                  if (err) {
                    res.status(500).send({ message: 'COULD_NOT_SAVE' })
                  } else {
                    res.status(200).json({ id })
                  }
                })
              } catch (err) {
                res.status(500).send({ message: 'ERROR_IN_TOKEN' })
              }
            } else {
              res.status(500).send({ message: 'ERROR_IN_TOKEN' })
            }
          })
        }
      })
    }
  })
}
