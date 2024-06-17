import Cookies from 'universal-cookie';

const cookies = new Cookies();
const TOKEN_KEY = 'auth_token';

export const getToken = (): string | undefined => {
  return cookies.get(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  cookies.set(TOKEN_KEY, token, { path: '/', maxAge: 604800, secure: true, sameSite: 'strict' });
};

export const removeToken = (): void => {
  cookies.remove(TOKEN_KEY, { path: '/' });
};
