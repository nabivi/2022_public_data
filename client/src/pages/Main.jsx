import React, { useEffect } from "react";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import "./style.css";
import Trai from "../assets/trai.png"
import HowTo from "../assets/how-to2.jpg"
import MainLogo from '../assets/pay_logo.png'
import AOS from "aos";
import "aos/dist/aos.css";

function MainPage () {
  useEffect(() => {
    AOS.init();
  })

  return ( 
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-md scroll-container">
        <div id="1" data-aos="zoom-out" className="w-full scroll-area gap-9 p-8">
          <h2 className="text-7xl">D-Eco</h2>
          <p className="text-center text-3xl">"쓰레기 분류기"</p>
          <div className="icon-scroll"></div>
        </div>
        <div id="2" className="scroll-area pb-10">
          <p className="text-5xl">분리수거만 해도</p>
          <img src={MainLogo} className="w-3/5" />
          <p className="text-5xl">가 내 손에</p>
          <p className="text-2xl text-center mt-16">1회 분리수거 시 5포인트 적립<br />적립한 포인트는<br />100 포인트당 1000원의 가치</p>
        </div>
        <div id="3" className="scroll-area gap-9">
          <p className="text-5xl">분리수거,<br />사진 한 번으로 끝</p>
          <img src={HowTo} className="w-full mb-16" />
        </div>
        <div id="4" className="scroll-area">
          <Link to="/classifier"><p className="text-5xl">시작하기 ＞</p></Link>
        </div>
      </div>
    </div>

  );
}

export default MainPage;