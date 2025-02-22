import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, recordLogin } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {}
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginRecorded, setLoginRecorded] = useState<boolean>(false);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setLoginRecorded(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser && currentUser.email) {
          setUser({ id: currentUser.id, email: currentUser.email });
          if (!loginRecorded) {
            try {
              await recordLogin(currentUser.email, import.meta.env.VITE_PUBLIC_APP_ENV);
              setLoginRecorded(true);
            } catch (error) {
              console.error('Failed to record login:', error);
              Sentry.captureException(error);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user && session.user.email) {
        setUser({ id: session.user.id, email: session.user.email });
        if (!loginRecorded) {
          recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV)
            .then(() => setLoginRecorded(true))
            .catch((error) => {
              console.error('Failed to record login:', error);
              Sentry.captureException(error);
            });
        }
      } else {
        setUser(null);
        setLoginRecorded(false);
      }
      setLoading(false);
    });

    getUser();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [loginRecorded]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};