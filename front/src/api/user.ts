import axios from 'axios';
import { ACCESS_TOKEN, API_URL } from '../../shared/constants';
import Cookies from 'js-cookie';

type ResponseType = {
  status: number;
  data: string;
};

export const updateUser = async (formData: FormData): Promise<ResponseType> => {
  const access_token = Cookies.get(ACCESS_TOKEN);
  console.log('a_token', ACCESS_TOKEN, access_token);

  return axios
    .patch(`${API_URL}/users/me`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      console.error(error);
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });
};
