import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import getVars from '../client/utils/getVars'
import reducers from '../client/reducers'

const { host, srvport } = getVars()
const { log, error } = console

export default req => {
  return createStore(
    reducers,
    {},
    applyMiddleware(
      thunk.withExtraArgument(
        axios.create({
          baseURL: `http://localhost:5000/api`,
          headers: { cookie: req.cookies ? req.cookies.cryptodockJwt : '' },
        })
      )
    )
  )
}
