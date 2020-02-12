import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_CURRENT_USER, SET_USER, GET_AUTH_ERRORS, GET_USER } from './types'

const { log, error } = console

export const getCurrentUser = () => async (dispatch, getState, api) => {
  if (!localStorage.cryptodockJwt) {
    api
      .get(`/users/current`)
      .then(({ data }) => dispatch({ type: GET_CURRENT_USER, payload: data }))
      .catch(error)
  }
}

export const getUser = id => async (dispatch, getState, api) => {
  api
    .get(`/users/${id}`)
    .then(({ data }) => dispatch({ type: GET_USER, payload: data }))
    .catch(error)
}

export const deleteUser = ({ id }) => async (dispatch, getState, api) => {
  api
    .delete(`/users/${id}`)
    .then(log)
    .catch(error)
}

export const updateUser = (id, fields) => async (dispatch, getState, api) => {
  api
    .put(`/users/${id}`, { fields })
    .then(log)
    .catch(error)
}

export const registerUser = user => async (dispatch, getState, api) => {
  api
    .post('/users/register', user)
    .then(data => log('registered', data))
    .then(() => (window.location.href = 'http://localhost:3000'))
    .catch(e => dispatch({ type: GET_AUTH_ERRORS, payload: e }))
}

export const loginUser = user => async (dispatch, getState, api) => {
  api
    .post('/users/login', user)
    .then(({ data }) => {
      log('loging data', data)
      const { token } = data
      const decoded = jwt_decode(token)
      localStorage.setItem('cryptodockJwt', token)
      setAuthToken(token)
      setUser(decoded)
      window.location.href = 'http://localhost:3000'
    })
    .catch(e => dispatch({ type: GET_AUTH_ERRORS, payload: e }))
}

export const setUser = ({ user }) => async (dispatch, getState, api) => {
  dispatch({ type: SET_USER, payload: user })
}

export const logoutUser = () => async (dispatch, getState, api) => {
  if (localStorage.cryptodockJwt) {
    localStorage.removeItem('cryptodockJwt')
    setAuthToken(false)
    setUser({})
    window.location.href = 'http://localhost:3000'
  }
}
