import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import routes from './routes'
import Header from './client/components/Partials/Header'
import Footer from './client/components/Partials/Footer'
import Helm from './client/components/Partials/Helm'

const { log, error } = console

function App({ route, preFetch, location }) {
  return (
    <div>
      <Helm />
      <Header location={location} route={route} />
      <article className="container mx-auto my-10" style={{ paddingTop: 60 }}>
        <Switch>
          {routes.map(({ path, exact, component }, i) => (
            <Route key={i} path={path} exact={exact} component={component} />
          ))}
        </Switch>
      </article>
      <Footer />
    </div>
  )
}

export default withRouter(App)
