import React, { useState } from 'react'
import Footers from './imgs/footer.png'
import { Heart, House, ScanLine, ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router-dom';

function Footer() {
    const [isActive, setIsActive] = useState('house');

    const isActiveArr = [
        { id: 'house', icon: House, position: 'top-[40px] left-[10px]' },
        { id: 'heart', icon: Heart, position: 'top-[40px] left-[80px]' },
        { id: 'card', icon: ShoppingCart, position: 'top-[40px] right-[80px]', path: '/cards' },
        { id: 'user', icon: User, position: 'top-[40px] right-[10px]' },
    ];


    return (
        <div className='fixed bottom-0 left-0 right-0 w-full max-w-[480px] h-[94px]  mx-auto z-50 bg-white'>

            <img src={Footers} alt="footer background" className='w-full h-full object-cover' />

            <div className='absolute bottom-[35px] left-1/2 -translate-x-1/2'>
                <ScanLine
                    className='rounded-full p-4 w-[65px] h-[65px] bg-green-400 text-white shadow-lg'
                />
            </div>

            <div className='absolute inset-0 flex justify-between items-center ml-8 mr-8'>
                {isActiveArr.map((item) => (
                    <Link
                        to={item.path}
                        key={item.id}
                        onClick={() => setIsActive(item.id)}
                        className={`
                absolute transition-all duration-300
                ${item.position}
                ${isActive === item.id ? 'text-green-600 scale-125' : 'text-gray-500'}
            `}
                    >
                        <item.icon size={24} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Footer
