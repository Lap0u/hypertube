import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getMe } from '../api/user';
import { UserDto } from '../dtos/UserLoginDto';

type AppContextProviderProps = {
  children: ReactNode;
};

type AppContextType = {
  user: UserDto | undefined;
  setUser: (user: UserDto | undefined) => void;
  isLoading: boolean;
};

export const AppContext = createContext<AppContextType>({
  user: undefined,
  setUser: () => {},
  isLoading: true,
});

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDto>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getMe();
        console.log('ctx response', response);
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const contextValue = {
    user,
    setUser,
    isLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
