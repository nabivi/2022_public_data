import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { useEffect } from 'react';
import axios from 'axios'
import { auth, db } from '../../Firebase';
import { checklist } from '../assets/checklist';
import "./style.css";

const datasetENG = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
const datasetKOR = ['박스류', '유리(병)류', '철(캔)류', '종이류', '플라스틱류', '일반 쓰레기']

function ClassifierPage (props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [point, setPoint] = useState(0);
  const [fileImage, setFileImage] = useState('');
  const [fileData, setFileData] = useState();
  const [existImage, setExistImage] = useState(false);
  const [label, setLabel] = useState('');
  const [labelIdx, setLabelIdx] = useState(0);
  const [allChecked, setAllChecked] = useState(true);
  const [isThrowed, setIsThrowed] = useState(false);

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

  useEffect(() => {
    if (fileImage) {
      setExistImage(true);
    } else {
      setExistImage(false);
    }
  }, [fileImage])

  function handleSubmit (e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('image', fileData);

    axios.post('http://127.0.0.1:8000/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      for (var i in datasetENG) {
        console.log(parseInt(i));
        if (datasetENG[i] == res.data.label) {
          setLabel(datasetKOR[i])
          setLabelIdx(parseInt(i));
        }
      }
    })
    .catch((err) => {
      console.log(err)
   })
  }

  function handleThrowClick (e) {
    for (var i in checklist[labelIdx]) {
      const checkbox = document.getElementById(checklist[labelIdx][i].label);
      const is_checked = checkbox.checked;
      console.log(is_checked)
      if (!is_checked) setAllChecked(false);
    }

    if (!allChecked) {
      db.collection('point').doc(email).set({
        id: email,
        point: point + 5,
        quiz: false
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
      window.alert('행복 포인트 적립!');
      navigate('/myinfo')
    } else {
      window.alert('체크리스트를 다시 확인해 주세요!')
    }
  }

  function handleNoModalClick (e) {
    window.alert('의견 감사합니다!');
    navigate('/');
  }

  return (
    <div className='w-full h-fit min-h-screen flex flex-col gap-8 items-center'>
      <Navbar click={isThrowed}/>
      <div className='w-full h-fit max-w-md flex flex-col justify-center items-center gap-5'>
        <form
          onSubmit={handleSubmit}
          className='w-full px-5 flex flex-col gap-5 items-center'>
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
          <></>         
          : <label htmlFor='file'>
            <div className='btn-secondary px-6 py-3 w-fit h-fit rounded-3xl mt-80'>사진 업로드</div>
          </label>
          }
          {existImage && label == '' ?
            <div className='flex gap-3'>
            <label htmlFor='submit'>
             <div className='btn-secondary px-6 py-3 w-fit h-fit rounded-3xl'>분류하기</div>
           </label>
           <div onClick={(e) => setFileImage('')} className='btn-secondary px-6 py-3 w-fit h-fit rounded-3xl'>
             사진 지우기
           </div> 
         </div> :
            label != '' ?
            <div className='flex flex-col gap-6 items-center'>
              <div className='font-area w-fit h-fit text-5xl text-black mt-9'>
                {'"' + label + '"'}
              </div>
              <div className='flex flex-col gap-4 mt-6'>
                <label htmlFor="yes-modal" className="font-area text-3xl">맞다 ＞</label>
                <div className='font-area flex gap-4 w-fit'>
                <input type="checkbox" id="yes-modal" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">버리기 전에...</h3>
                      <div className='flex flex-col my-4 gap-3'>
                        {checklist[labelIdx].map((check, idx) =>
                          <div className="flex gap-4 items-center" key={idx}>
                            <p className="">{check.check}</p>
                            <input type="checkbox" id={check.label} className="checkbox checkbox-secondary" />
                        </div>)}
                      </div>
                      <div className="modal-action">
                        <label onClick={handleThrowClick} htmlFor="yes-modal" className="btn btn-secondary">버리기</label>
                        <label htmlFor="yes-modal" className="btn btn-ghost btn-secondary">닫기</label>
                      </div>
                      
                    </div>
                  </div>
                  <label htmlFor="no-modal" className="font-area text-3xl">아니다 ＞</label>
                  <input type="checkbox" id="no-modal" className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">해당 쓰레기는 무엇인가요?</h3>
                      <input type="text" placeholder="입력하기" className="input input-bordered w-full max-w-xs mt-4" />
                      <div className="modal-action">
                        <label onClick={handleNoModalClick} htmlFor="no-modal" className="btn btn-secondary">제출</label>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             :
            <></>
          }
          
        </form>
      </div>
    </div>
  )
}

export default ClassifierPage;