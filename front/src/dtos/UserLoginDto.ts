export type UserLoginDto = {
  username: string;
  email: string;
  password: string;
};

export type UserDto = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  preferredLanguage: string;
};
