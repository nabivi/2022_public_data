import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

function SignupPage () {
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
            type='submit' value='회원가입' className='btn w-64 mt-3 text-white' />
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignupPage;
