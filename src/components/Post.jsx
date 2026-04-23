import axios from 'axios';
import { ChevronLeft, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Post() {
  const [postDetails, setPostDetails] = useState({});
  const [count, setCount] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
      setPostDetails(res.data)
      console.log(res.data);
      
    })
  }, [id]);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const increment = () => {
    setCount(count + 1);
  };

  const handleBuyNow = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const isExist = cart.find(item => item.id === postDetails.id);

    if (isExist) {
      const updatedCart = cart.map(item =>
        item.id === postDetails.id ? { ...item, quantity: item.quantity + count } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newItem = {
        id: postDetails.id,
        title: postDetails.title,
        price: postDetails.price,
        images: postDetails.images,
        description: postDetails.description,
        quantity: count
      };
      localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
    }
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };


  return (
    <div className='max-w-[480px] h-full relative rounded-2xl bg-gray-200'>
      <div>
        <img src={postDetails.images} alt="" className='w-full rounded-3xl object-cover p-[29px] relative' />
        <Link to={`/`}><ChevronLeft strokeWidth={1.25} className='absolute top-12 left-10 w-[35px] h-[35px] rounded-[50%] bg-white ' /></Link>
        <Heart className='absolute top-12 right-10 w-[35px] h-[35px] rounded-[50%] bg-white p-1.5 text-green-400' />
      </div>
      <div className='w-full h-[504px]  bg-gray-100 rounded-t-3xl px-[25px]'>
        <p className='text-[20px]  font-medium mt-[34px]'>{postDetails.title}</p>
        <p className='text-sm font-normal mt-3'>{postDetails.description}</p>
        <p className='text-[15px] font-medium mt-[20px]'>Size:</p>
        <div className='flex text-center items-center gap-[10px] font-bold'>
          <p className='w-[28px] h-[28px] rounded-[50%] border border-green-400 text-green-400'>S</p>
          <p className='w-[28px] h-[28px] rounded-[50%] border'>M</p>
          <p className='w-[28px] h-[28px] rounded-[50%] border'>L</p>
          <p className='w-[28px] h-[28px] rounded-[50%] border'>XL</p>
        </div>
      </div>
      <div className='w-full h-[164px] bottom-0 fixed absolute z-20 bg-gray-50 rounded-t-3xl rounded-b-2xl px-[25px]'>
        <div className='mt-[20px] flex justify-between'>
          <div className='flex h-[28px] w-[118px] items-center text-center gap-[11px] justify-center'>
            Qty
            <button onClick={decrement} className='w-[28px] h-[28px]  bg-gray-300 rounded-[50%] text-center flex items-center justify-center'><Minus size={16} strokeWidth={1} absoluteStrokeWidth /></button>
            <p className='text-[20px] font-bold'>{count}</p>
            <button onClick={increment} className='w-[28px] h-[28px]  bg-gray-300 rounded-[50%] text-center flex items-center justify-center'><Plus size={16} strokeWidth={1} absoluteStrokeWidth /></button>
          </div>
          <h1 className='text-[20px] font-bold text-green-500'>
            ${postDetails.price}
          </h1>
        </div>

        <div className='flex text-center items-center mt-[20px]'>
          <button onClick={handleBuyNow} className='py-[20px] px-[64px] rounded-[40px] bg-green-600 font-bold text-white text-[16px]'>Buy Now</button>
          <Link to={`/cards`}><ShoppingCart className='ml-[10px] w-[60px] h-[60px] bg-gray-300 rounded-[50%] p-[20px]' /></Link>
        </div>
      </div>
      {showToast && (
        <div className='fixed top-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce'>
          <div className='bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border-2 border-white'>
            <div className='bg-white text-green-500 rounded-full p-1'>
              <Plus size={16} strokeWidth={3} />
            </div>
            <span className='font-bold text-sm'>
              {count} ta mahsulot savatga qo'shildi!
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Post