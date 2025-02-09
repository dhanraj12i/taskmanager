import { ReactNode, useEffect, useMemo, useState } from "react";
import { auth } from "../../config/firebase/firebase-Config";
import { User } from "firebase/auth";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<object>({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        sessionStorage.setItem("user", JSON.stringify(firebaseUser));
      } else {
        setUser({});
        sessionStorage.removeItem("user");
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
