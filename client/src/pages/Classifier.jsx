import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ClassifierImg from '../assets/classifier.png'
import CrossMark from '../assets/cross.png'
import { useEffect } from 'react';
import axios from 'axios'

function ClassifierPage () {
  const [fileImage, setFileImage] = useState('');
  const [fileData, setFileData] = useState();
  const [existImage, setExistImage] = useState(false);

  useEffect(() => {
    if (fileImage) {
      setExistImage(true);
    } else {
      setExistImage(false);
    }
  }, [fileImage])

  function handleSubmit (e) {
    e.preventDefault();
    console.log(fileImage);
    axios.post('http://localhost:8000/predict', {image: fileData})
    .then((res) => {
      console.log(res.label);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className='w-full h-fit min-h-screen flex flex-col gap-8 justify-between items-center'>
      <Navbar />
      <div className='w-full h-fit max-w-md flex flex-col items-center gap-5'>
        <img src={ClassifierImg} className='w-[250px]' />
        <form
          onSubmit={handleSubmit}
          className='w-full px-5 flex flex-col gap-5 items-center'>
          {existImage ?
            <label htmlFor='submit'>
              <div className='btn text-white'>분류하기</div>
            </label>
          : <label htmlFor='file'>
            <div className='btn text-white'>사진 업로드!</div>
          </label>
          }
          <input
            type='file'
            name='image'
            id='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              setFileImage(URL.createObjectURL(e.target.files[0]))
              setFileData(e.target.files[0])}} />
          <input 
            type='submit'
            name='submit'
            id='submit'
            className='hidden' />
          <img src={fileImage} className='w-full'/>
          {existImage ?
            <div onClick={(e) => setFileImage('')}>
              <img src={CrossMark} className='w-4' />
            </div> :
            <></>
          }
          
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default ClassifierPage;