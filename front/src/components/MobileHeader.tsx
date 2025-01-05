import React from 'react';
import MainTitle from './MainTitle';
import { TiThMenu } from 'react-icons/ti';
import { useState } from 'react';
import { ImCross } from 'react-icons/im';

const MobileHeader = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="md:hidden py-4 w-full bg-mainBlack text-white ">
      <div className="w-full pb-4 relative border-b-white border-b-2 flex flex-col justify-center items-center h-full">
        <TiThMenu
          className="absolute left-2"
          size={28}
          onClick={() => setVisible((visible) => !visible)}
        />
        <MainTitle />
        {visible && (
          <ImCross
            className="absolute right-2 top-0"
            size={24}
            onClick={() => setVisible(false)}
          />
        )}
      </div>
      {visible && (
        <div className="w-full absolute bg-mainBlack py-4">
          <div className="flex flex-col items-start gap-4 ">
            <div className="bg-red-600 rounded-md ml-4 px-8 py-2 hover:bg-red-700 hover:cursor-pointer text-nowrap ">
              Films populaires
            </div>
            <hr className="border-[1px] border-white w-full" />
            <div className="bg-red-600 rounded-md ml-4 px-8 py-2 hover:bg-red-700 hover:cursor-pointer text-nowrap">
              Recherche
            </div>
            <hr className="border-[1px] border-white w-full" />
            <div className="bg-red-600 rounded-md ml-4 px-8 py-2 hover:bg-red-700 hover:cursor-pointer text-nowrap">
              Utilisateurs
            </div>
            <hr className="border-[1px] border-white w-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
