import React from 'react'
import Header from './headers/Header'
import Footer from './Footer'
import Main from './Main'
import HeaderCamp from './headers/headerCamp'

function Home() {
  return (
    <div className='w-full sm:max-w-[480px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]'>
        <Header />
        <HeaderCamp />
        <Main />
        <Footer />
    </div>
  )
}

export default Home