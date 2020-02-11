import { GET_CURRENT_USER, GET_AUTH_ERRORS, SET_USER, GET_USER } from '../actions/users/types'

export function getCurrentUserReducer(s = false, a) {
  switch (a.type) {
    case GET_CURRENT_USER:
      return a.payload || false
    case SET_USER:
      return a.payload || false
    default:
      return s
  }
}

export function getUserReducer(s = [], a) {
  switch (a.type) {
    case GET_USER:
      return a.payload || {}
    default:
      return s
  }
}

export function getAuthErrorsReducer(s = [], a) {
  switch (a.type) {
    case GET_AUTH_ERRORS:
      return a.payload
    default:
      return s
  }
}
