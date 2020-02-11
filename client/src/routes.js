import React from 'react'
import { Redirect } from 'react-router-dom'
import LandingPage from './client/components/Pages/LandingPage'
import NotFound from './client/components/Pages/NotFound'
import Registration from './client/components/Pages/Registration'
import Login from './client/components/Pages/Login'
import Profile from './client/components/Pages/Profile'
import Documentation from './client/components/Pages/Documentation'
import Contact from './client/components/Pages/Contact'

export default [
  {
    path: '/',
    to: '/',
    component: LandingPage,
    exact: true,
    label: 'CryptoDock',
    auth: false,
  },
  {
    path: '/documentation',
    to: '/documentation',
    component: Documentation,
    exact: true,
    label: 'Documentation',
    auth: false,
  },
  {
    path: '/contact',
    to: '/contact',
    component: Contact,
    exact: true,
    label: 'Contact',
    auth: false,
  },
  {
    path: '/registration',
    to: '/registration',
    component: Registration,
    exact: true,
    label: 'Registration',
    auth: false,
    hide: true,
  },
  {
    path: '/login',
    to: '/login',
    component: Login,
    exact: true,
    label: 'Login',
    auth: false,
    hide: true,
  },
  {
    path: '/profile/:first_name',
    to: '/profile',
    component: Profile,
    label: 'Profile',
    auth: true,
    id: true,
    hide: true,
  },
  {
    path: '/404',
    to: '/404',
    component: NotFound,
    exact: true,
    auth: false,
    hide: true,
  },
  {
    path: '*',
    to: '/404',
    component: () => <Redirect to="/404" />,
    exact: false,
    auth: false,
    hide: true,
  },
]
