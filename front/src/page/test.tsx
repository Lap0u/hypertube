import { useEffect } from 'react';

const Test = () => {
  const handleScroll = () => {
    alert('scroll');
  };

  return (
    <div className="bg-red-400">
      <div className="h-screen text-blue-800 text-[12rem]">Test</div>
      <div className="h-screen text-blue-800 text-[12rem]">Test</div>
    </div>
  );
};

export default Test;
