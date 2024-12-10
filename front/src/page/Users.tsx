import React, { useEffect, useState } from 'react';
import { UserDto } from '../dtos/UserLoginDto';
import { getUsers } from '../api/user';

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
    <div className="bg-black w-screen h-screen flex flex-col justify-start items-start pl-32 pt-32 gap-y-12">
      {users.map((user) => {
        return (
          <div className="flex gap-x-12 items-center">
            <img
              className="w-24 h-24"
              src={user.profilePictureUrl || '/user-default-white.png'}
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
