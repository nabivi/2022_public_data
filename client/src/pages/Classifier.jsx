import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ClassifierImg from '../assets/classifier.png'

function ClassifierPage () {
  const [fileImage, setFileImage] = useState('');

  return (
    <div className='w-full h-fit min-h-screen flex flex-col gap-8 justify-between items-center'>
      <Navbar />
      <div className='w-full h-fit max-w-md flex flex-col items-center gap-5'>
        <img src={ClassifierImg} className='w-[250px]' />
        <form className='w-full px-5 flex flex-col gap-5 items-center'>
          <label for='file'>
            <div className='btn text-white'>사진 업로드!</div>
          </label>
          <input
            type='file'
            name='file'
            id='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => setFileImage(URL.createObjectURL(e.target.files[0]))} />
          <img src={fileImage} className='w-full'/>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default ClassifierPage;