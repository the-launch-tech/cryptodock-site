const { log, error } = console

export default class User {
  constructor(Conn) {
    this.Conn = Conn

    this.single = this.single.bind(this)
    this.save = this.save.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  single({ key, value }, callback) {
    this.Conn.asyncQuery(
      'SELECT id, first_name, last_name, email, access_key, password, created FROM users WHERE ' +
        key +
        '=? LIMIT 1',
      [value]
    )
      .then(data => callback(false, data[0]))
      .catch(error => callback(error, false))
  }

  save({ first_name, last_name, email }, pw, callback) {
    this.Conn.asyncQuery(
      'INSERT INTO users (first_name, last_name, email, password) values (?,?,?,?)',
      [first_name, last_name, email, pw]
    )
      .then(data => callback(false, data.insertId))
      .catch(error => callback(error, false))
  }

  update(id, fields, callback) {
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
      .then(data => callback(false, data))
      .catch(error => callback(error, false))
  }

  delete(id, callback) {
    this.Conn.asyncQuery('DELETE FROM users WHERE id=?', [id])
      .then(data => callback(false, data))
      .catch(error => callback(error, false))
  }
}
