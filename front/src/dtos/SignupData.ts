export type SignUpData = {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  preferredLanguage?: string;
  profilePicture?: File | undefined; // Change to File for uploading
};
