import React, { useState, useEffect } from 'react';
import { Trash2, ChevronLeft, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const updateCount = (id, amount) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + amount);
                return { ...item, quantity: newQty };
            }
            return item;
        });

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // id: postDetails.id,
    //     title: postDetails.title,
    //         price: postDetails.price,
    //             images: postDetails.images,
    //                 description: postDetails.description,
    //                     quantity: count

    return (

        <div className='w-full min-h-screen px-[28px] relative pb-[380px]' >

            <div className='flex w-full mt-[33px] items-center text-center'>
                <Link to={'/'}><ChevronLeft className='w-[33px] h-[33px] rounded-[50%] bg-gray-300 cursor-pointer' /></Link>
                <div className='flex w-full justify-center'>
                    <h1 className='text-[20px] font-medium'>Card</h1>
                </div>
            </div>

            <div className='mt-6 space-y-4'>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className='flex items-center justify-between gap-4 bg-gray-50 py-4 rounded-2xl'>
                            <div className='flex gap-4'>
                                <img src={item.images} alt="" className='w-20 h-20 rounded-xl object-cover' />
                                <div className='flex h-20 flex-col justify-between'>
                                    <h3 className='font-medium '>{item.title}</h3>
                                    <p className='text-green-600 text-[18px] font-bold'>${item.price}</p>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => updateCount(item.id, -1)}
                                        className='w-[28px] h-[28px]  bg-gray-300 rounded-[50%] text-center flex items-center justify-center'>
                                        <Minus size={16} strokeWidth={1} absoluteStrokeWidth />
                                    </button>
                                    <p className='text-[20px] font-bold'>{item.quantity}</p>
                                    <button
                                        onClick={() => updateCount(item.id, +1)}
                                        className='w-[28px] h-[28px]  bg-gray-300 rounded-[50%] text-center flex items-center justify-center'>
                                        <Plus size={16} strokeWidth={1} absoluteStrokeWidth />
                                    </button>
                                </div>

                                <button onClick={() => removeItem(item.id)} className='text-red-500 p-2'>
                                    <Trash2 size={20} />
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className='text-center mt-10 text-gray-500'>Savat hozircha bo'sh</p>
                )}
            </div>

            <div className='fixed bottom-0 left-0 right-0 h-[265px] bg-white px-[28px] rounded-t-3xl z-40 max-w-[480px] mx-auto'>
                <div className='w-full h-[50px] flex rounded-3xl bg-gray-100 mt-[33px] overflow-hidden'>
                    <input
                        type="text"
                        className='w-full bg-transparent focus:outline-none px-4 text-sm'
                        placeholder='Enter coupon code here...'
                    />
                    <button className='w-[97px] h-full bg-green-400 font-bold text-white'>Apply</button>
                </div>

                <div className='mt-10 flex justify-between items-center'>
                    <span className='text-gray-500 font-bold text-2xl'>Total:</span>
                    <span className='text-2xl font-bold text-green-500'>${totalPrice.toFixed(2)}</span>
                </div>

                <button className='w-full h-[60px] rounded-[40px] mt-[28px] bg-green-400 font-bold text-white'>Proceed To Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
