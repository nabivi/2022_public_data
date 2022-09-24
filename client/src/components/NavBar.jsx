import React, { useState } from 'react';
import Clover from '../assets/clover.png'

function Navbar () {
  const [point, setPoint] = useState(0);

  return (
    <div className='w-full h-12 max-w-md flex justify-between items-center px-6'>
      <div className='w-fit h-fit flex gap-2'>
        <img src={Clover} className='h-6' />
        <p>{point}</p>
      </div>
      <p>로그인</p>
    </div>
  )

}

export default Navbar;