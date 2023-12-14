import * as React from 'react';
import { Auth } from '@/api/response';
import { useMutation } from '@tanstack/react-query';
import { setHeaderToken } from '@/api/axiosClient';
import { AuthAPI } from '@/api/methods';

type AuthContextType = {
  auth?: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth | undefined>>;
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
  const [auth, setAuth] = React.useState<Auth | undefined>();
  const isAuthenticated = !!auth?.accessToken;

  const { mutate: refreshTokens } = useMutation({
    mutationKey: ['refresh', isAuthenticated],
    mutationFn: () => AuthAPI.refreshTokens(),
    onSuccess: (data: Auth) => {
      setAuth(data);
      setHeaderToken(data.accessToken);
    },
    onError: () => {
      setAuth(undefined);
    },
  });

  React.useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval>;

    if (isAuthenticated) {
      refreshInterval = setInterval(
        () => {
          setHeaderToken(auth?.refreshToken);
          refreshTokens();
        },
        1000 * 60 * 15 - 5,
      );
    }

    return () => clearInterval(refreshInterval);
  }, [auth?.refreshToken, isAuthenticated, refreshTokens]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
