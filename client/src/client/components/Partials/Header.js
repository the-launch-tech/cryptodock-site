import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { logoutUser } from '../../actions/users/actions'
import routes from '../../../routes'
import buildPath from '../../utils/buildPath'

function Header({ auth, location, logoutUser }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  function handleScroll(e) {
    if (window.pageYOffset > 60 && !scrolled) {
      setScrolled(true)
    } else if (window.pageYOffset <= 60 && scrolled) {
      setScrolled(false)
    }
  }

  function getNavbarClasses(route, location, scrolled) {
    if (scrolled) {
      return route.to === location.pathname
        ? 'text-green-2 hover:text-white active:text-green-2'
        : 'text-white hover:text-red-2 active:text-white'
    } else {
      return route.to === location.pathname
        ? 'text-green-2 hover:text-blue-2 active:text-green-2'
        : 'text-red-2 hover:text-blue-2 active:text-red-2'
    }
  }

  return (
    <header
      className={`fixed z-50 w-full top-0 flex flex-wrap items-center justify-between px-2 shadow-md transition-all transition-200 ${
        scrolled ? 'py-1 bg-blue-4' : 'py-3 bg-white-850'
      }`}
    >
      <nav className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <ul className="flex justify-start items-center">
          {routes.map((route, i) => {
            if ((!route.hide && !route.auth) || (route.auth && auth && !route.hide)) {
              return (
                <li key={i} className="nav-item">
                  <Link
                    to={route.auth ? buildPath(route, auth) : route.to}
                    className={`px-3 py-2 flex items-center text-sm font-head uppercase font-thin transition-all transition-200 ${getNavbarClasses(
                      route,
                      location,
                      scrolled
                    )}`}
                  >
                    {route.label}
                  </Link>
                </li>
              )
            }
          })}
        </ul>
        <ul className="flex justify-center items-center">
          {auth && (
            <li className="nav-item">
              <Link
                to={`/profile/${auth.first_name}`}
                className={`px-3 py-2 flex items-center text-sm font-head uppercase font-thin transition-all transition-200 ${getNavbarClasses(
                  { to: `/profile/${auth.first_name}` },
                  location,
                  scrolled
                )}`}
              >
                {auth.first_name}
              </Link>
            </li>
          )}
          {!auth && (
            <li className="nav-item">
              <Link
                to="/login"
                className={`px-3 py-2 flex items-center text-sm font-head uppercase font-thin transition-all transition-200 ${getNavbarClasses(
                  { to: '/login' },
                  location,
                  scrolled
                )}`}
              >
                Login
              </Link>
            </li>
          )}
          <li className="mx-1 p-0">
            <a
              href="mailto:daniel@thelaunch.tech"
              className="flex flex-col justify-center items-center text-white text-tiny transition-all transition-200 hover:text-red-2 font-head"
            >
              <i className="fal fa-envelope bg-red-2 text-white  shadow-lg text-lg p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none inline-block text-center transition-all transition-200 hover:bg-white hover:text-red-2"></i>{' '}
            </a>
          </li>
          <li className="mx-1 p-0">
            <a
              href="https://github.com/the-launch-tech"
              target="_blank"
              className="flex flex-col justify-center items-center text-white text-tiny transition-all transition-200 hover:text-red-2 font-head"
            >
              <i className="fab fa-github bg-red-2 text-white shadow-lg text-lg p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none inline-block text-center transition-all transition-200 hover:bg-white hover:text-red-2"></i>{' '}
            </a>
          </li>
          {auth && (
            <li className="nav-item">
              <a
                href="http://localhost:5000/api/users/logout"
                onClick={logoutUser}
                className={`px-3 py-2 flex items-center text-sm font-head uppercase font-thin transition-all transition-200 ${getNavbarClasses(
                  { to: `/api/users/logout` },
                  location,
                  scrolled
                )}`}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default withRouter(
  connect(
    ({ auth }) => {
      return { auth }
    },
    {
      logoutUser,
    }
  )(Header)
)
