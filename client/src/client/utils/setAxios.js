import axios from 'axios'

export default {
  server: req => {
    const headers = {
      'Content-Type': 'application/json',
      cookie: req.get('cookie') || '',
    }

    if (global.localStorage) {
      headers['Authorization'] = global.localStorage.jwtToken
    }

    return axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
      headers: headers,
    })
  },
  client: () => {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (localStorage) {
      headers['Authorization'] = localStorage.jwtToken
    }

    return axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
      headers: headers,
    })
  },
}
