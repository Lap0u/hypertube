import { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../components/MainTitle';
import Footer from '../components/Footer';

const Home = () => {
  const nav = useNavigate();
  return (
    <div className="w-100 bg-mainBlack min-g-screen bg-cover min-h-screen">
      <div
        className="
     text-white grid grid-cols-2 px-48   justify-center items-center text-3xl bg-bottom gap-24">
        <h2 className="text-[86px] leading-[6rem] uppercase font-bold title-font ">
          Regardez des{' '}
          <span className="line-through decoration-red-600 decoration-[16px]  title-font">
            milliers
          </span>
          &ensp;
          <span className="text-secYellow title-font">millions </span>
          de films et séries en streaming
        </h2>
        <div className="flex gap-24 justify-center">
          <Button
            text="LOGIN"
            onClick={() =>
              nav('/login', { state: { toLogin: true } })
            }></Button>
          <Button
            text="SIGN UP"
            onClick={() =>
              nav('/login', { state: { toLogin: false } })
            }></Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
