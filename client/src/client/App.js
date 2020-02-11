import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect, Provider } from 'react-redux'
import { getCurrentUser, setUser, logoutUser } from './actions/users/actions'
import routes from '../routes'
import setAuthToken from './utils/setAuthToken'
import Header from './components/Partials/Header'
import Footer from './components/Partials/Footer'
import Helm from './components/Partials/Helm'

const { log, error } = console

let set = false

function App({ route, getCurrentUser, setUser, logoutUser, location, auth }) {
  useEffect(() => {
    if (!localStorage.jwtToken) {
      getCurrentUser()
    }
  })

  if (typeof window !== 'undefined') {
    if (localStorage.jwtToken && !set) {
      setAuthToken(localStorage.jwtToken)
      const decoded = jwt_decode(localStorage.jwtToken)
      setUser(decoded)
      if (setAuthToken.exp < Date.now() / 1000) {
        logoutUser()
      }
      set = true
    }

    log('localStorage.jwtToken', localStorage.jwtToken, auth)
  }

  return (
    <div>
      <Helm />
      <Header location={location} route={route} />
      <article className="container mx-auto my-10" style={{ paddingTop: 60 }}>
        <Switch>
          {routes.map(({ path, exact, component }, i) => {
            return <Route key={i} path={path} exact={exact} component={component} />
          })}
        </Switch>
      </article>
      <Footer />
    </div>
  )
}

export default withRouter(
  connect(
    ({ auth }) => {
      return { auth }
    },
    {
      getCurrentUser,
      setUser,
      logoutUser,
    }
  )(App)
)
