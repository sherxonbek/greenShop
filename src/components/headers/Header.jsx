import { Search, TableOfContents } from 'lucide-react'
import React from 'react'

function Header() {
    return (
        <div className=' mx-[24px] mt-[41px] lg:hidden'>
            <form action="" className='flex  rounded  gap-2 text-center items-center'>
                <div className='flex w-full gap-2  bg-gray-100 p-1.4 rounded items-center'>
                    <Search size={30} className='ml-2'/>
                    <input type="text" className='focus:outline-none w-full text-xl p-1.5 font-medium' placeholder='Find your plants'/>
                </div>
                <TableOfContents size={35} className='border rounded p-1.2 bg-green-400 text-white' />
            </form>
        </div>
    )
}

export default Header