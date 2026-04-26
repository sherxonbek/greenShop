import { LogIn, Search, ShoppingCart, Sprout } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function HeaderCamp() {
  const [activeTabs, setAciveTabs] = useState('home');
  const [count, setCount] = useState(0);


  const headerTabArr = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'plantCare', label: 'Plant Care' },
    { id: 'blogs', label: 'Blogs' },
  ];


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCount(data.length);
  }, []);

  return (
    <div className='hidden lg:block'>
      <div className='flex text-center items-center justify-between mx-8 mt-4 mb-0'>
        <div className='flex text-center items-center gap-2'>
          <Sprout className='size-8 w-12 h-12 border rounded-[50%] p-2 bg-green-400 text-white' />
          <h1 className='text-3xl font-extrabold text-green-400'>GREENSHOP</h1>
        </div>
        <div className='flex text-2xl gap-6 font-medium'>
          {headerTabArr.map((item) => (
            <button
              key={item.id}
              onClick={() => setAciveTabs(item.id)}
              className={`
                            pb-2 text-[15px] transition-all duration-300 relative
                            ${activeTabs === item.id
                  ? 'text-green-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-green-600'
                  : 'text-gray-900 hover:text-green-400 font-mono'
                }
                        `}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className='flex gap-3 items-center'>
          <Search />
          <div className='relative'>
            <ShoppingCart />
            <h1 className=' absolute bottom-3 left-5 text-green-600 font-extrabold'>{count}</h1>
          </div>
          <div className='flex gap-2 border p-1.5 bg-green-500 text-white rounded-xl font-bold'>
            <LogIn />
            <h1>
              Login
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderCamp
