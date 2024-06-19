import Cookies from 'universal-cookie';

const cookies = new Cookies();
const TOKEN_KEY = 'auth_token';

export const getToken = () => cookies.get(TOKEN_KEY);

export const setToken = (token: string) => {
  return new Promise<void>((resolve) => {
    cookies.set(TOKEN_KEY, token, { path: '/' });
    resolve();
  });
};

export const removeToken = () => cookies.remove(TOKEN_KEY, { path: '/' });