import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../assets/logo.png'
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

function MenuPage () {
  return (
    <div className='w-full h-screen flex flex-col justify-between items-center'>
      <Navbar />
      <div className='w-full h-fit max-w-md mb-14 flex flex-col items-center gap-5'>
        <div className='w-[250px] h-[300px]'>
          <img src={LogoImg} className='w-full' />
        </div>
        <Link to='/classifier'>      
          <button className='btn btn-primary w-52 text-white'>
            쓰레기 분류기
          </button>
        </Link>
        <Link to='/'> 
          <button className='btn btn-secondary w-52 text-white'>
            쓰레기 퀴즈
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default MenuPage;