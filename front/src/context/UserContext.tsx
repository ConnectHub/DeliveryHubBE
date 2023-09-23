import { createContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { login } from '../pages/Login/api';
import useLocalStorage from 'use-local-storage';
import { FormValues } from '../pages/Login/interfaces';
import { User } from './interfaces';
import jwt from 'jsonwebtoken';

export const AuthContext = createContext({
  user: {
    authToken: '',
    rate: false,
    username: '',
    role: [''],
  },
  signIn: (values: FormValues) => {
    return Promise.resolve(values.email);
  },
  isError: false,
});

interface UserContextProps {
  children: React.ReactNode;
}

function ContextUserContext({ children }: UserContextProps) {
  const [user, setUser] = useState<User>({
    authToken: '',
    rate: false,
    username: '',
    role: [''],
  });
  const { mutateAsync, isError } = useMutation('login', login);
  const [token, setToken] = useLocalStorage('token', '');
  const [rate, setRate] = useLocalStorage<boolean>('rate', false);
  const [username, setUsername] = useLocalStorage('username', '');

  const decodedToken = jwt.decode(token) as { roles: string[] };

  useEffect(() => {
    if (token) {
      setUser({
        authToken: token,
        rate,
        username,
        role: decodedToken?.roles ?? [],
      });
    }
  }, [token, rate, username, decodedToken?.roles]);

  async function signIn(values: FormValues) {
    const { authToken, rate, username } = await mutateAsync(values);
    const decodedToken = jwt.decode(token) as { roles: string[] };
    setUser({
      authToken,
      rate,
      username,
      role: decodedToken?.roles ?? [],
    });
    setToken(authToken);
    setRate(rate);
    setUsername(username);
    return authToken;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isError }}>
      {children}
    </AuthContext.Provider>
  );
}

export default ContextUserContext;
