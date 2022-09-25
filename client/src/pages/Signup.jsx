import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { auth, db } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

function SignupPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      data = await auth.createUserWithEmailAndPassword(email, password);
      console.log(data);
      db.collection('point').doc(email).set({
        id: email,
        point: 0
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error(error);
      });
      navigate('/');
      
    } catch(error) {
      console.log(error);
      window.alert(error.message);
    }
  }

  return (
    <div className='w-full h-screen flex flex-col justify-between items-center'>
      <Navbar />
      <div className='w-full h-fit max-w-md p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
          <input
            type="text"
            placeholder="이메일"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-64" />
          <input
            type="password"
            placeholder="비밀번호"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-64" />
          <input
            type='submit' value='회원가입' className='btn w-64 mt-3 text-white' />
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignupPage;
