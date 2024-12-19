export type UserLoginDto = {
  username: string;
  email: string;
  password: string;
};

export type UserDto = {
  id: number;
  username: string;
  profilePictureUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  preferredLanguage: string;
};
