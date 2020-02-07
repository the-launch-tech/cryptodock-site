import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './client/assets/styles/cryptodock.scss'

ReactDOM.hydrate(
  <Router>
    <App preFetch={window.PREFETCH} />
  </Router>,
  document.getElementById('cryptodock')
)
