import { createContext } from "react";
import { user } from "../../types/types";
import { User } from "firebase/auth";

interface AuthContextType {
  user: user | User;
  setUser: React.Dispatch<React.SetStateAction<user | User>>;
}

const defaultContextValue: AuthContextType = {
  user: {},
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);
