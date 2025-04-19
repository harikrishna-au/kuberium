
import React, { createContext, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const dummyUser: User = {
  id: 'dummy-user-id',
  email: 'user@example.com',
  created_at: new Date().toISOString(),
  aud: 'authenticated',
  role: 'authenticated',
} as User;

const dummySession: Session = {
  access_token: 'dummy-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'dummy-refresh',
  user: dummyUser,
} as Session;

const AuthContext = createContext<AuthContextProps>({
  session: dummySession,
  user: dummyUser,
  loading: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signOut = async () => {
    // Do nothing since we're using dummy data
  };

  const value = {
    session: dummySession,
    user: dummyUser,
    loading: false,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
