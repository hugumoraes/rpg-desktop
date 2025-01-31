import { api } from '..';

interface Login {
  token: string;
}

interface LoginResponse {
  token: string;
}

class Auth {
  login = async ({ token }: Login): Promise<LoginResponse> => {
    try {
      const { data } = await api.get<LoginResponse>('/users/authentication', {
        headers: {
          authorization: 'Basic ' + token,
        },
      });

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
}

export const auth = new Auth();
