import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Clover from '../assets/clover.png'
import { auth, db } from '../../Firebase'

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
    <div className='w-full h-12 max-w-md flex justify-between items-center px-4'>
      <div className='w-fit h-fit flex gap-2'>
        <img src={Clover} className='h-6' />
        <p>{point}</p>
      </div>
      {isLogin ?
      <p onClick={(e) => {
        auth.signOut()
        setPoint(0)}}>로그아웃</p>:
      <Link to='/login'><p>로그인</p></Link>}
    </div>
  )

}

export default Navbar;