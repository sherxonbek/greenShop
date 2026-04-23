import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

function Home() {
  return (
    <div className='w-full max-w-[480px]'>
        <Header />
        <Main />
        <Footer />
    </div>
  )
}

export default Home