import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

function LoginPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      data = await auth.signInWithEmailAndPassword(email, password);
      console.log(data);
      navigate('/myinfo');
      
    } catch(error) {
      console.log(error);
      window.alert(error.message);
    }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <Navbar />
      <div className='flex justify-center items-center w-full h-full max-w-md p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
          <input
            type="text"
            placeholder="이메일"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-64" />
          <input
            type="password"
            placeholder="비밀번호"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-64" />
          <input
            type='submit' value='로그인' className='btn btn-secondary w-64 mt-3' />
          <Link to='/signup'>
            <button className='btn btn-ghost w-64'>회원가입</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;