import * as React from 'react';
import { Token } from '@/api/response';

type AuthContextType = {
  auth?: Token;
  setAuth: React.Dispatch<React.SetStateAction<Token | undefined>>;
  isAuthenticated: boolean;
};

const initialState: AuthContextType = {
  auth: undefined,
  setAuth: () => null,
  isAuthenticated: false,
};

const AuthContext = React.createContext<AuthContextType>(initialState);

type Props = React.PropsWithChildren;

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = React.useState<Token | undefined>();
  const isAuthenticated = !!auth?.accessToken;

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
