import React from 'react';

type Buttonprops = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: Buttonprops) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white px-8 py-4 rounded-md transition-all delay-75 ease-out hover:bg-black hover:text-red-600">
      {text}
    </button>
  );
};

export default Button;
