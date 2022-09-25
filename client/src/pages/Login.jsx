import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

function LoginPage () {
  return (
    <div className='w-full h-screen flex flex-col justify-between items-center'>
      <Navbar />
      <div className='w-full h-fit max-w-md p-5'>
        <form className='flex flex-col items-center gap-3'>
          <input
            type="text" placeholder="이메일" className="input input-bordered w-64" />
          <input
            type="text" placeholder="비밀번호" className="input input-bordered w-64" />
          <input
            type='submit' value='로그인' className='btn btn-secondary w-64 mt-3 text-white' />
          <Link to='/signup'>
            <button className='btn btn-ghost w-64'>회원가입</button>
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage;