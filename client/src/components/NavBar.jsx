import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Clover from '../assets/clover.png'
import { auth } from '../../Firebase'

function Navbar () {
  const [isLogin, setIsLogin] = useState(false);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false)
      }
    });
  }, []);

  return (
    <div className='w-full h-12 max-w-md flex justify-between items-center px-4'>
      <div className='w-fit h-fit flex gap-2'>
        <img src={Clover} className='h-6' />
        <p>{point}</p>
      </div>
      {isLogin ?
      <p onClick={(e) => auth.signOut()}>로그아웃</p>:
      <Link to='/login'><p>로그인</p></Link>}
    </div>
  )

}

export default Navbar;