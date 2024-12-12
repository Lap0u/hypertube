import { useNavigate } from 'react-router-dom';
import MainTitle from './MainTitle';
import { UserDto } from '../dtos/UserLoginDto';
import { useEffect, useState } from 'react';
import { getMe } from '../api/user';
import { API_URL } from '../../shared/constants';
import { globalInstance, protectedInstance } from '../api/axios';

const Header = () => {
  const nav = useNavigate();
  const [user, setUser] = useState<UserDto | null>(null);
  useEffect(() => {
    const fetchMe = async () => {
      const response = await getMe();
      if (response.status === 401) return;
      setUser(response.data);
    };
    fetchMe();
  }, []);
  console.log(user);
  const logout = () => {
    protectedInstance
      .post('/auth/signOut')
      .then((response) => {
        console.log('res me', response);
        if (response.status === 201) nav('/');
        return { status: response.status, data: response.data };
      })
      .catch((error) => {
        console.log('err', error);
        return {
          status: error.response.status,
          data: error.response.data.message,
        };
      });
  };

  return (
    <div className="pb-8 w-full bg-mainBlack">
      <div className="w-full  text-white bg-mainBlack flex justify-between p-4 items-center border-b-2 border-red-600">
        <div className="flex justify-between items-center gap-64 w-full">
          <div
            className="custom-font-reg text-[4rem] text-red-600 hover:cursor-pointer"
            onClick={() => nav('/')}>
            H
          </div>
          <div className="flex gap-12 items-center">
            <div
              className=" bg-red-600 rounded-md px-8 py-2 hover:bg-red-700 hover:cursor-pointer text-nowrap"
              onClick={() => nav('/library')}>
              Films populaires
            </div>
            {user && (
              <div
                className=" bg-red-600 rounded-md px-8 py-2 hover:bg-red-700 hover:cursor-pointer text-nowrap"
                onClick={() => nav('/search')}>
                Recherche
              </div>
            )}
            {user && (
              <div
                className=" bg-red-600 rounded-md px-8 py-2 hover:bg-red-700 hover:cursor-pointer text-nowrap mr-32"
                onClick={() => nav('/users')}>
                Utilisateurs
              </div>
            )}
            <MainTitle />
          </div>
        </div>
        <div className="flex gap-8 items-center w-full justify-end">
          <img
            onClick={() => user && nav('/profile')}
            className="rounded-full border-red-500 w-8 h-8 hover:cursor-pointer"
            src={
              user?.profilePictureUrl && user?.profilePictureUrl !== ''
                ? user?.profilePictureUrl
                : '/user-default-white.png'
            }
            alt=""
          />
          {user === null ? (
            <div
              className=" bg-red-600 rounded-md px-8 py-2 hover:bg-red-700 hover:cursor-pointer text-nowrap"
              onClick={() => nav('/login')}>
              Login
            </div>
          ) : (
            <div
              className=" bg-red-600 rounded-md px-8 py-2 hover:bg-red-700 hover:cursor-pointer text-nowrap"
              onClick={() => logout()}>
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
