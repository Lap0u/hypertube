export type SignUpData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  preferredLanguage: string;
  profilePictureUrl: string | undefined; // Change to File for uploading
};
