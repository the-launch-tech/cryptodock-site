export default (route, user) => {
  if (route.id) {
    return route.to + '/' + user.id
  }
}
