import React from 'react';
import MainTitle from './MainTitle';
import { TiThMenu } from 'react-icons/ti';
import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { UserDto } from '../dtos/UserLoginDto';
import { useNavigate } from 'react-router-dom';

type MobileHeaderProps = {
  user: UserDto | undefined;
  logout: () => void;
};

const MobileHeader = ({ user, logout }: MobileHeaderProps) => {
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();

  return (
    <div className="lg:hidden md:text-2xl py-4 w-full bg-mainBlack text-white ">
      <div className="w-full pb-4 relative border-b-white border-b-2 flex flex-col justify-center items-center h-full">
        <TiThMenu
          className="absolute left-2"
          size={28}
          onClick={() => setVisible((visible) => !visible)}
        />
        <MainTitle />
        {visible && (
          <ImCross
            className="absolute right-4 top-0 hover:cursor-pointer"
            size={20}
            onClick={() => setVisible(false)}
          />
        )}
      </div>
      {visible && (
        <div className="w-full absolute bg-mainBlack pb-4 z-40">
          <div className="flex flex-col items-start">
            <div
              className="py-3 boder-b-white border-b-[1px] pl-4 w-full h-full hover:bg-red-700 hover:cursor-pointer text-nowrap "
              onClick={() => {
                nav('/library');
                setVisible(false);
              }}>
              Films populaires
            </div>
            {user && (
              <div
                className=" py-3 boder-b-white border-b-[1px] pl-4 w-full h-full hover:bg-red-700 hover:cursor-pointer text-nowrap "
                onClick={() => {
                  nav('/search');
                  setVisible(false);
                }}>
                Recherche
              </div>
            )}
            {user && (
              <div
                className=" py-3 boder-b-white border-b-[1px] pl-4 w-full h-full hover:bg-red-700 hover:cursor-pointer text-nowrap  mr-32"
                onClick={() => {
                  nav('/users');
                  setVisible(false);
                }}>
                Utilisateurs
              </div>
            )}
            {user === undefined ? (
              <div
                className=" py-3 boder-b-white border-b-[1px] pl-4 w-full h-full hover:bg-red-700 hover:cursor-pointer text-nowrap "
                onClick={() => {
                  nav('/login');
                  setVisible(false);
                }}>
                Login
              </div>
            ) : (
              <>
                <div
                  className=" py-3 boder-b-white border-b-[1px] pl-4 w-full h-full hover:bg-red-700 hover:cursor-pointer text-nowrap "
                  onClick={() => {
                    nav('/profile');
                    setVisible(false);
                  }}>
                  Profile
                </div>
                <div
                  className=" py-3 boder-b-white border-b-[1px] pl-4 w-full h-full hover:bg-red-700 hover:cursor-pointer text-nowrap "
                  onClick={() => {
                    logout();
                    setVisible(false);
                  }}>
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
