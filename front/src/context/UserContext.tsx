import { createContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { login } from '../pages/Login/api';
import useLocalStorage from 'use-local-storage';
import { FormValues } from '../pages/Login/interfaces';
import { User } from './interfaces';

export const AuthContext = createContext({
  user: {
    authToken: '',
    rate: false,
    username: '',
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
  });
  const { mutateAsync, isError } = useMutation('login', login);
  const [token, setToken] = useLocalStorage('token', '');
  const [rate, setRate] = useLocalStorage<boolean>('rate', false);
  const [username, setUsername] = useLocalStorage('username', '');

  useEffect(() => {
    if (token) {
      setUser({
        authToken: token,
        rate,
        username,
      });
    }
  }, [token, rate]);

  async function signIn(values: FormValues) {
    const { authToken, rate, username } = await mutateAsync(values);
    setUser({
      authToken,
      rate,
      username,
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
