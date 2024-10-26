import { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const nav = useNavigate();
  return (
    <div className="w-100 bg-black h-screen bg-cover">
      <h1 className="text-[9rem] custom-font text-red-600 p-12 text-center">
        Hypratube
      </h1>
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
            text="Log in"
            onClick={() =>
              nav('/login', { state: { toSignin: false } })
            }></Button>
          <Button
            text="Sign up"
            onClick={() =>
              nav('/login', { state: { toSignin: true } })
            }></Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
