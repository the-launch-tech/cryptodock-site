import passport from 'passport'
import jwt from 'jsonwebtoken'

const { log, error } = console

export default (req, res, next) => {
  log('POST /users/login', req.user, req.body, req.cookies)

  passport.authenticate('local-login', { session: false }, (error, user) => {
    if (error || !user) {
      res.status(400).json({ error })
    }

    const payload = {
      user,
      expires: Date.now() + parseInt(30 * 24 * 60 * 60 * 1000),
    }

    req.login(payload, { session: false }, error => {
      if (error) {
        res.status(400).send({ error })
      }

      const token = jwt.sign(JSON.stringify(payload), process.env.SECRET)

      res.cookie('cryptodockJwt', token, { httpOnly: true, secure: true })
      res.status(200).send({ user, token })
    })
  })(req, res)
}
