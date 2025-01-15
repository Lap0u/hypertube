import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getMe } from '../api/user';
import { UserDto } from '../dtos/UserLoginDto';

type AppContextProviderProps = {
  children: ReactNode;
};

type AppContextType = {
  user: UserDto | undefined;
  setUser: (user: UserDto | undefined) => void;
};

export const AppContext = createContext<AppContextType>({
  user: undefined,
  setUser: () => {},
});
export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDto>();
  const contextValue = { user, setUser };
  useEffect(() => {
    const getUser = async () => {
      const response = await getMe();
      console.log('ctx response', response);
      if (response.status === 200) setUser(response.data);
      console.log('ctx user', user);
    };
    getUser();
  }, []);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
