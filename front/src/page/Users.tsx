import React, { useEffect, useState } from 'react';
import { UserDto } from '../dtos/UserLoginDto';
import { getUsers } from '../api/user';
import { API_URL } from '../../shared/constants';

const UsersPage = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      const userList = response.data;
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  return (
    <div className="bg-mainBlack w-screen h-screen flex flex-col justify-start items-start pl-32 pt-32 gap-y-12">
      {users.length === 0 && (
        <div className="text-4xl text-white text-center w-100">
          Aucun utilisateur existant.
        </div>
      )}
      {users.map((user) => {
        return (
          <div key={user.id} className="flex gap-x-12 items-center">
            <img
              className="w-24 h-24 rounded-full"
              src={
                user.profilePictureUrl
                  ? user.profilePictureUrl
                  : '/user-default-white.png'
              }
              alt=""
            />
            <div className="text-white">{user.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default UsersPage;
