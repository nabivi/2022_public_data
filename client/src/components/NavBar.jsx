import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Clover from '../assets/clover.png'
import { auth, db } from '../../Firebase'
import MainLogo from '../assets/pay_logo.png'
import UserIcon from '../assets/user_icon.svg'

function Navbar (props) {
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
        setIsLogin(true);
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
        setIsLogin(false)
      }
    });
  }, []);

  useEffect(() => {
    if (props.click) {
      setPoint(point + 1);
      db.collection('point').doc(email).set({
        id: email,
        point: point + 1
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    }
  }, [props.click])

  return (
    <div className='w-full h-[8vh] max-w-md flex justify-between items-center px-4 py-1 bg-white drop-shadow-md'>
      <button className='h-full'>
      <Link to="/">
        <img src={MainLogo} className='h-full' />
      </Link>
      </button>
      <button className='h-[40%]'>
        {isLogin ? 
        <Link to="/myinfo">
        <img src={UserIcon} className='h-[100%]' />
        </Link> :
        <Link to="/login">
        <img src={UserIcon} className='h-[100%]' />
        </Link> }
      </button>
    </div>
  )

}

export default Navbar;