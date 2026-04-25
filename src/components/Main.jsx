import { ArrowRight, Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Gul from './imgs/gul.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './headers/Header';
import Footer from './Footer';

function Main() {

    const [activeTab, setAciveTab] = useState('plants');
    const [prodact, setProdact] = useState([])

    useEffect(() => {
        try {
            const prodacts = async () => {
                const { data } = await axios.get('https://dummyjson.com/products');
                setProdact(data.products)


            }
            prodacts()
        } catch (error) {

        }
    }, []);

    console.log(prodact);


    const activeTabArr = [
        { id: 'plants', label: 'All Plants' },
        { id: 'arrivals', label: 'New Arrivals' },
        { id: 'sale', label: 'Sale' },
    ];

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
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <div className='mx-[24px] mt-[17px] overflow-y-auto overflow-x-hidden no-scrollbar'>
            <section className='w-full h-[190px] mt-[17px] lg:h-[250px] rounded-4xl bg-green-100 italic relative'>
                <div className='mt-[24px] ml-[23px] w-[206px] h-[114px] lg:w-[550px] '>
                    <h1 className='text-[11px] font-[500] lg:text-[24px] lg:font-semibold lg:pt-[12px]'>Welcome to GreenShop</h1>
                    <h1 className='text-[24px] font-[900] lg:text-[42px]'>Let’s make a
                        better <span className='text-green-400'>planet</span></h1>
                    <p className='text-[12px] font-[400] lg:text-[22px]'>We are an online plant shop offering a wide range </p>
                    <h2 className='text-[12px] font-[700] mt-[11px] lg:text-[22px] lg:mt-[40px] flex items-center gap-[2px] text-green-400'>SHOP NOW <ArrowRight size={12} className='lg:size-8'/></h2>
                </div>
                <div className='flex lg:absolute lg:items-center lg:text-center lg:bottom-0 lg:right-20'>
                    <img src={Gul} alt="" className='w-[82px] h-[82px] absolute top-24 right-26 lg:w-[150px] lg:h-[150px] lg:static' />
                    <img src={Gul} alt="" className='w-[213px] h-[213px] absolute bottom-0 left-62 lg:w-[260px] lg:h-[260px] lg:static' />
                </div>
            </section>
            <div className='flex mt-[25px] gap-[15px] border-b border-gray-100'>
                {activeTabArr.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setAciveTab(item.id)}
                        className={`
                            pb-2 text-[15px] transition-all duration-300 relative
                            ${activeTab === item.id
                                ? 'text-green-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-green-600'
                                : 'text-gray-500 hover:text-green-400'
                            }
                        `}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[19px] mt-[19px] pb-20 md:mb-[55px] lg:mb-0 lg:pb-0'>
                {prodact.map((item) => (
                    <div
                        key={item.id}
                        className='rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg p-2'
                    >
                        <Link to={`/posts/${item.id}`}>
                            <div className="bg-gray-200 rounded-2xl h-[200px] relative flex items-center justify-center overflow-hidden group">
                                <img
                                    src={item.images}
                                    className='max-w-full max-h-full object-contain rounded-2xl transition-transform duration-500 group-hover:scale-110'
                                />
                                <button onClick={loveBuyNow}><Heart className='absolute top-[12px] text-green-400 right-[11px] z-20 hover:fill-green-400 cursor-pointer transition-colors' /></button>

                                <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                            </div>

                            <h1 className='text-sm font-normal mt-2 line-clamp-1 group-hover:text-green-600 transition-colors'>{item.title}</h1>
                            <h1 className='text-base font-bold text-green-500'>${item.price}</h1>
                        </Link>

                    </div>
                ))}
            </section>
        </div>
    )
}

export default Main