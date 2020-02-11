export default function(e, data, validate = false, callback) {
  const value = e.target.value
  const name = e.target.name
  const newData = Object.assign({}, data)
  newData[name].value = value
  newData[name].dirty = true
  newData[name].valid = validate ? validate(value, newData) : true
  callback(newData)
}
