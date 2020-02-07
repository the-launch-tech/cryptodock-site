import React from 'react'
import { Redirect } from 'react-router-dom'
import LandingPage from './client/components/Pages/LandingPage'
import NotFound from './client/components/Pages/NotFound'

export default [
  {
    path: '/',
    component: LandingPage,
    exact: true,
    loadData: () => {
      return 'loadDatad'
    },
  },
  {
    path: '/404',
    component: NotFound,
    exact: true,
  },
  {
    path: '*',
    component: () => <Redirect to="/404" />,
    exact: false,
  },
]
