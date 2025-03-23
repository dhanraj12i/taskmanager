import { ReactNode, useEffect, useMemo, useState } from "react";
import { auth } from "../../config/firebase/firebase-Config";
import { User } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { user } from "../../types/types";
import { setUUID } from "../store/slice";
import { useDispatch } from "react-redux";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<user | User>({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: User | null) => {
      if (firebaseUser) {
        dispatch(setUUID(firebaseUser?.uid))
        setUser(firebaseUser);
        sessionStorage.setItem("user", JSON.stringify(firebaseUser));
      } else {
        setUser({});
        sessionStorage.removeItem("user");
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
