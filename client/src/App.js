import React from 'react'
import LandingPage from './client/components/Pages/LandingPage'
import Header from './client/components/Partials/Header'
import Footer from './client/components/Partials/Footer'
import Helm from './client/components/Partials/Helm'

export default function App({ route }) {
  return (
    <div>
      <Helm />
      <Header />
      <article className="container mx-auto my-10" style={{ paddingTop: 60 }}>
        <LandingPage />
      </article>
      <Footer />
    </div>
  )
}
