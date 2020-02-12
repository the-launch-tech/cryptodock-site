const { log, error } = console

export default class User {
  constructor(Conn) {
    this.Conn = Conn

    this.single = this.single.bind(this)
    this.save = this.save.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  single({ key, value }) {
    return new Promise((resolve, reject) => {
      this.Conn.asyncQuery(
        'SELECT id, first_name, last_name, email, access_key, password, created FROM users WHERE ' +
          key +
          '=? LIMIT 1',
        [value]
      )
        .then(data => resolve(data[0]))
        .catch(error => reject(error))
    })
  }

  save({ first_name, last_name, email }, pw) {
    return new Promise((resolve, reject) => {
      this.Conn.asyncQuery(
        'INSERT INTO users (first_name, last_name, email, password) values (?,?,?,?)',
        [first_name, last_name, email, pw]
      )
        .then(data => resolve(data.insertId))
        .catch(error => reject(error))
    })
  }

  update(id, fields) {
    return new Promise((resolve, reject) => {
      let query = 'UPDATE users SET '
      let bindings = []

      Object.keys(fields).map((key, i) => {
        bindings.push(fields[key])
        query += ' ' + key + '=? '
        if (i >= Object.keys(fields).length - 1) {
          query += ', '
        }
      })

      query += 'WHERE id=?'
      bindings.push(id)

      this.Conn.asyncQuery(query, bindings)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.Conn.asyncQuery('DELETE FROM users WHERE id=?', [id])
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}
