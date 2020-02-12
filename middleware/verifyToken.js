import jwt from 'jsonwebtoken'

const { log, error } = console

export default async (req, res, next) => {
  const handleError = () => {
    return res.status(401).json({
      success: false,
      message: 'INVALID_CREDENTIALS',
    })
  }

  let token = req.headers['Authorization']

  log("req.headers['Authorization']", req.headers['Authorization'])

  if (!token) {
    return handleError()
  }

  if (token.includes('Bearer')) {
    token = token.replace('Bearer ', '')
  }

  token.trim()

  const user = await jwt.verify(token, process.env.SECRET)

  try {
    if (user) {
      req.user = user
      next()
    } else {
      return handleError()
    }
  } catch (err) {
    handleError()
  }
}
