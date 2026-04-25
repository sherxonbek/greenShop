import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Root from './components/Root'
import Post from './components/Post'
import Home from './components/Home'
import Card from './components/Card'
import Like from './components/Like'



function App() {
  return (
    <div className='w-full sm:max-w-[480px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] flex flex-col m-auto min-h-screen relative'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />}>
            <Route index element={<Home />} />
            <Route path='/cards' element={<Card />} />
            <Route path='/likes' element={<Like />} />
            <Route path='posts/:id' element={<Post />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
