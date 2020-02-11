export default function(e, data, validate = false, callback) {
  const selected = Array.from(e.target.children).filter(child => child.selected)
  const value = selected[0].name
  const name = e.target.name
  const newData = Object.assign({}, data)
  newData[name].value = value
  newData[name].dirty = true
  newData[name].valid = validate ? validate(value, newData) : true
  callback(newData)
}
