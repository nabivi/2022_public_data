import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Clover from '../assets/clover.png'

function Navbar () {
  const [point, setPoint] = useState(0);

  return (
    <div className='w-full h-12 max-w-md flex justify-between items-center px-4'>
      <div className='w-fit h-fit flex gap-2'>
        <img src={Clover} className='h-6' />
        <p>{point}</p>
      </div>
      <Link to='/login'><p>로그인</p></Link>
    </div>
  )

}

export default Navbar;