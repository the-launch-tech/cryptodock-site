import React from 'react'
import Header from './Partials/Header'
import Footer from './Partials/Footer'
import LandingPage from './Pages/LandingPage'

export default class CryptoDock extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <article className="container mx-auto my-10" style={{ paddingTop: 60 }}>
          <LandingPage />
        </article>
        <Footer />
      </div>
    )
  }
}
