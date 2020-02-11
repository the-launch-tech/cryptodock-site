import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { log, error } = console

export default (req, res, User) => {
  log('POST /users/login', req.body)

  User.single({ key: 'email', value: req.body.user.email }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'REQUEST_ERROR' })
    } else if (user) {
      bcrypt.compare(req.body.user.password, user.password).then(match => {
        if (match) {
          jwt.sign(
            {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              access_key: user.access_key,
              created: user.created,
            },
            process.env.USER_SESSION,
            { expiresIn: '1 week' },
            (err, token) => {
              if (err) {
                res.status(500).send({ message: 'TOKEN_ERROR' })
              } else {
                res.status(200).json({ token, user })
              }
            }
          )
        } else {
          res.status(500).send({ message: 'UNABLE_TO_LOGIN' })
        }
      })
    }
  })
}
