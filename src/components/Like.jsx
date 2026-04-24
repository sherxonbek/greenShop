import { ChevronLeft, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Like() {
    const [likeItems, setLikeItems] = useState([]);

    useEffect(() => {
        const savedLike = JSON.parse(localStorage.getItem('like')) || [];
        setLikeItems(savedLike);
    }, []);

    const removeItem = (id) => {
        const deleteCard = likeItems.filter(item => item.id !== id);
        setLikeItems(deleteCard);
        localStorage.setItem('like', JSON.stringify(deleteCard));
    };

    return (
        <div className='w-full min-h-screen px-[28px] relative pb-[380px]' >

            <div className='flex w-full mt-[33px] items-center text-center'>
                <Link to={'/'}><ChevronLeft className='w-[33px] h-[33px] rounded-[50%] bg-gray-300 cursor-pointer' /></Link>

                <div className='flex w-full justify-center'>
                    <h1 className='text-[20px] font-medium'>Card Like</h1>
                </div>
            </div>

            <div className='mt-6 space-y-4'>
                {likeItems.length > 0 ? (
                    likeItems.map((item) => (
                        <div key={item.id} className='flex items-center justify-between gap-4 bg-gray-50 py-4 rounded-2xl'>
                            <div className='flex gap-4'>
                                <img src={item.images} alt="" className='w-20 h-20 rounded-xl object-cover' />
                                <div className='flex h-20 flex-col justify-between'>
                                    <h3 className='font-medium '>{item.title}</h3>
                                    <p className='text-green-600 text-[18px] font-bold'>${item.price}</p>
                                </div>
                            </div>

                            <button onClick={() => removeItem(item.id)} className='text-red-500 p-2'>
                                <Trash2 size={20} />
                            </button>

                        </div>
                    ))
                ) : (
                    <p className='text-center mt-10 text-gray-500'>Savat hozircha bo'sh</p>
                )}
            </div>
        </div>
    )
}

export default Like