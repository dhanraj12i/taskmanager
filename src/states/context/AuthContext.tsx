import { createContext } from "react";

interface AuthContextType {
  user: object;
  setUser: React.Dispatch<React.SetStateAction<object>>;
}

const defaultContextValue: AuthContextType = {
  user: {},
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);
