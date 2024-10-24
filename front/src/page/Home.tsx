import { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const nav = useNavigate();
  return (
    <div
      className="w-100 bg-black h-screen bg-cover
     text-white flex justify-center items-center text-3xl bg-bottom flex-col gap-24">
      <h1 className="text-[7rem] custom-font text-red-600 p-12">Hypratube</h1>
      <div className="flex gap-24 justify-center">
        <Button
          text="Log in"
          onClick={() =>
            nav('/login', { state: { toSignin: false } })
          }></Button>
        <Button
          text="Sign in"
          onClick={() => nav('/login', { state: { toSignin: true } })}></Button>
      </div>
    </div>
  );
};

export default Home;
