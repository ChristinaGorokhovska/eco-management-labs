import { useState, createContext, useContext } from "react";

export interface Auth {
  email: string;
  password: string;
  accessToken: string;
  roles: Array<number>;
  name: {
    firstName: string;
    lastName: string;
  };
}

interface AuthContext {
  auth: Auth;
  setAuth: (auth: Auth) => void;
}

export const initialAuthState: Auth = {
  email: "",
  password: "",
  accessToken: "",
  roles: [],
  name: {
    firstName: "",
    lastName: "",
  },
};

const initialAuthContextState: AuthContext = {
  auth: initialAuthState,
  setAuth: (auth: Auth) => undefined,
};

export const AuthContext = createContext<AuthContext>(initialAuthContextState);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [auth, setAuth] = useState<Auth>(initialAuthState);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}
