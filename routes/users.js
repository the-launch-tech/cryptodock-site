import isLoggedIn from '../middleware/isLoggedIn'
import verifyToken from '../middleware/verifyToken'
import registerUser from '../controllers/users/register'
import loginUser from '../controllers/users/login'
import logoutUser from '../controllers/users/logout'
import getCurrentUser from '../controllers/users/current'
import getSingleUser from '../controllers/users/single'
import updateUser from '../controllers/users/update'
import deleteUser from '../controllers/users/delete'

const { log, error } = console

export default (CryptoDock, authed) => {
  log('userRoutes')

  CryptoDock.post('/api/users/register', registerUser)
  CryptoDock.post('/api/users/login', loginUser)
  CryptoDock.get('/api/users/logout', logoutUser)
  CryptoDock.get('/api/users/current', getCurrentUser)
  CryptoDock.get('/api/users/:id', verifyToken, getSingleUser)
  CryptoDock.put('/api/users/:id', updateUser)
  CryptoDock.delete('/api/users/:id', deleteUser)
}
