export default function(data) {
  return Object.keys(data).filter(key => !data[key].valid && data[key].required).length === 0
}
