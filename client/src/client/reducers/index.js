import { combineReducers } from 'redux'

import { getCurrentUserReducer, getAuthErrorsReducer, getUserReducer } from './users'

export default combineReducers({
  auth: getCurrentUserReducer,
  userErrors: getAuthErrorsReducer,
  user: getUserReducer,
})
