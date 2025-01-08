import { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../components/MainTitle';
import Footer from '../components/Footer';

const Home = () => {
  const nav = useNavigate();
  return (
    <div className="w-screen bg-mainBlack min-g-screen bg-cover ">
      <div
        className="
     text-white lg:grid grid-cols-2 px-4 lg:px-48   flex  flex-col justify-center items-center text-3xl bg-bottom gap-12 lg:gap-24">
        <h2 className="md:text-[60px] lg:text-[86px] md:leading-[6rem] uppercase font-bold title-font ">
          Regardez des{' '}
          <span className="line-through decoration-red-600 decoration-[8px] lg:decoration[16px]  title-font">
            milliers
          </span>
          &ensp;
          <span className="text-secYellow title-font">millions </span>
          de films et séries en streaming
        </h2>
        <div className="flex gap-12 justify-center">
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
    </div>
  );
};

export default Home;
