/* ----------- External ----------- */
import { jwtDecode } from 'jwt-decode';
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

/* ----------- Interfaces ----------- */
interface AuthContextData {
  user: User;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface Props {
  children?: React.ReactNode;
}

interface Decoded {
  sub: string;
  exp: number;
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  /* ----------- States ----------- */
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User>({
    email: '',
    first_name: '',
    user_id: 0,
    last_name: '',
  });

  /* ----------- Effects ----------- */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local_token = localStorage.getItem('@rpg:token');

      if (local_token != null && local_token !== '') {
        const { email, exp, first_name, last_name, user_id }: Decoded =
          jwtDecode(local_token);

        // If the token is expired, remove it
        if (Date.now() >= exp * 1000) {
          setToken('');
          localStorage.removeItem('@rpg:token');
          return;
        }

        setUser({
          email,
          first_name,
          user_id: user_id,
          last_name,
        });
        setToken(local_token);
      }
    }

    return (): void => {
      setUser({
        email: '',
        first_name: '',
        user_id: 0,
        last_name: '',
      });
      setToken('');
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      setToken,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};
