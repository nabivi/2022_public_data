import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { auth, db } from '../../Firebase'
import "./style.css";

function MyInfoPage () {
  const [email, setEmail] = useState('');
  const [point, setPoint] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
        db.collection('point').where('id','==', user.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setPoint(doc.data().point);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
      }
    });
  }, []);

  return (
    <div className='font-area w-full h-screen flex flex-col items-center'>
      <Navbar />
      <div className='w-full h-fit flex flex-col p-6 gap-7'>
        <p className='text-3xl leading-10'>{email} 님,<br />함께 포인트 모아요!</p>
        <div className='w-full h-fit flex flex-col'>
          <div className='flex justify-between px-5 py-8 w-full h-fit bg-secondary rounded-t-xl border-[1px] border-white'>
            <p className='text-lg'>행복 포인트</p>
            <p className='text-xl'>{point.toString()} 점</p>
          </div>
          <div className="flex flex-row">
          <button className="btn btn-secondary w-1/2 rounded-none rounded-bl-xl border-t-[1px] border-r-[1px] border-white text-black"><Link to='/classifier'>적립하러 가기</Link></button>
          <button className="btn btn-secondary w-1/2 rounded-none rounded-br-xl border-t-[1px] border-l-[1px] border-white text-black">환전하기</button>
        </div>
        </div>
      </div>
      <button
        onClick={(e) => auth.signOut()}
        className='btn btn-ghost absolute bottom-5'><Link to='/'>로그아웃</Link></button>
    </div>
  )
}

export default MyInfoPage;