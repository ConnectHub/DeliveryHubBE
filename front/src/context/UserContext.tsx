import { createContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { login } from '../pages/Login/api';
import useLocalStorage from 'use-local-storage';
import { FormValues } from '../pages/Login/interfaces';

export const AuthContext = createContext({
  user: {
    authToken: '',
  },
  signIn: (values: FormValues) => {
    return new Promise<string>((resolve) => resolve(values.email));
  },
  isError: false,
});

interface UserContextProps {
  children: React.ReactNode;
}

interface User {
  authToken: string;
}

function ContextUserContext({ children }: UserContextProps) {
  const [user, setUser] = useState<User>({
    authToken: '',
  });
  const { mutateAsync, isError } = useMutation('login', login);
  const [token, setToken] = useLocalStorage('token', '');

  useEffect(() => {
    if (token) {
      setUser({
        authToken: token,
      });
    }
  }, [token]);

  async function signIn(values: FormValues) {
    const { authToken } = await mutateAsync(values);
    setUser({
      authToken,
    });
    setToken(authToken);
    return authToken;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isError }}>
      {children}
    </AuthContext.Provider>
  );
}

export default ContextUserContext;
