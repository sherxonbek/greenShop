import axios from 'axios';
import { ChevronLeft, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Post() {
  const [postDetails, setPostDetails] = useState({});
  const [count, setCount] = useState(1);
  const [chaqirildi, setChaqirildi] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [likePost, setLikePost] = useState(false);
  const { id } = useParams();
  const [countes, setCountes] = useState(0);



  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
      setPostDetails(res.data)
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

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCountes(cart.length);
  }, [handleBuyNow]);

  const loveBuyNow = () => {
    const like = JSON.parse(localStorage.getItem('like')) || [];

    const isExist = like.find(item => item.id === postDetails.id);

    if (isExist) {
      const updatedLike = like.map(item =>
        item.id === postDetails.id ? { ...item } : item
      );
      localStorage.setItem('like', JSON.stringify(updatedLike));
    } else {
      const newItem = {
        id: postDetails.id,
        title: postDetails.title,
        price: postDetails.price,
        images: postDetails.images,
        description: postDetails.description,
      };
      localStorage.setItem('like', JSON.stringify([...like, newItem]));
    }
    setLikePost(true);

    setTimeout(() => {
      setLikePost(false);
    }, 3000);
  };


  return (
    <div className='sm:max-w-[480px] sm:h-full relative rounded-2xl bg-gray-200 lg:flex lg:static lg:max-w-full'>
      <div className=' lg:w-1/2 lg:relative '>
        <img src={postDetails.images} alt="" className='sm:w-full rounded-3xl object-cover p-[29px] relative lg:w-[800px] ' />
        <Link to={`/`}><ChevronLeft strokeWidth={1.25} className='absolute top-12 left-10 w-[35px] h-[35px] rounded-[50%] bg-white ' /></Link>
        <button onClick={loveBuyNow}><Heart className='absolute top-12 right-10 w-[35px] h-[35px] rounded-[50%] bg-white p-1.5 text-green-400' /></button>
      </div>
      <div className='lg:w-1/2 bg-gray-100 lg:relative'>
        <div className='w-full h-[504px]  bg-gray-100 rounded-t-3xl px-[25px]'>
          <p className='text-[20px]  font-medium mt-[34px] lg:text-[38px]'>{postDetails.title}</p>
          <p className='text-sm font-normal mt-3 lg:text-2xl'>{postDetails.description}</p>
          <p className='text-[15px] font-medium mt-[20px] lg:text-3xl'>Size:</p>
          <div className='flex text-center items-center gap-[10px] font-bold lg:mt-8'>
            <p className='w-[28px] h-[28px] lg:w-[46px] lg:h-[46px] lg:text-3xl rounded-[50%] border border-green-400 text-green-400'>S</p>
            <p className='w-[28px] h-[28px] lg:w-[46px] lg:h-[46px] lg:text-3xl rounded-[50%] border'>M</p>
            <p className='w-[28px] h-[28px] lg:w-[46px] lg:h-[46px] lg:text-3xl rounded-[50%] border'>L</p>
            <p className='w-[28px] h-[28px] lg:w-[46px] lg:h-[46px] lg:text-3xl rounded-[50%] border'>XL</p>
          </div>
        </div>
        <div className='w-full h-[164px] bottom-0 fixed absolute z-20 bg-gray-50 rounded-t-3xl rounded-b-2xl px-[25px] lg:bottom-20 lg:flex lg:items-center lg:gap-20'>
          <div className='mt-[20px] flex justify-between lg:flex-col'>

            <div className='flex h-[28px] w-[118px] items-center text-center gap-[11px] justify-center lg:order-2 lg:w-[236px] lg:justify-start'>
              <h1 className='lg:text-2xl'>Qty</h1>
              <button onClick={decrement} className='w-[28px] h-[28px] lg:w-[36px] lg:h-[36px] bg-gray-300 rounded-[50%] flex items-center justify-center'>
                <Minus size={16} strokeWidth={1} className='lg:size-18' />
              </button>
              <p className='text-[20px] font-bold lg:text-[26px]'>{count}</p>
              <button onClick={increment} className='w-[28px] h-[28px] lg:w-[36px] lg:h-[36px] bg-gray-300 rounded-[50%] flex items-center justify-center'>
                <Plus size={16} strokeWidth={1} className='lg:size-18' />
              </button>
            </div>
            <h1 className='text-[20px] font-bold text-green-500 lg:order-1 lg:text-[32px]'>
              ${postDetails.price}
            </h1>

          </div>

          <div className='flex text-center items-center mt-[20px]'>
            <button onClick={handleBuyNow} className='py-[20px] px-[64px] rounded-[40px] bg-green-600 font-bold text-white text-[16px]'>Buy Now</button>
            <Link to={`/cards`} className=' relative'><ShoppingCart className='ml-[10px] w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] bg-gray-300 rounded-[50%] p-[20px]' />
              <h1 className=' absolute top-3 left-12 font-extrabold text-green-500 lg:text-2xl lg:left-16 lg:top-0'>{countes}</h1>
            </Link>
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
        {likePost && (
          <div className='fixed top-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce'>
            <div className='bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border-2 border-white'>
              <div className='bg-white text-green-500 rounded-full p-1'>
              </div>
              <span className='font-bold text-sm'>
                Mahsulot likelar bo`limiga qo`shildi!!!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Post