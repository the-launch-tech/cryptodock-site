import User from './User'

export default Conn => {
  global.User = new User(Conn)
}
