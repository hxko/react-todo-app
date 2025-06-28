// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  authInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  const lastUserEmail = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setAuthInitialized(true);

      // Only show welcome if it's a different user or new login
      if (currentUser && currentUser.email !== lastUserEmail.current) {
        toast.success(`Welcome back, ${currentUser.email}!`);
        lastUserEmail.current = currentUser.email;
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      let errorMessage = 'Login failed';

      if (typeof error === 'object' && error !== null && 'code' in error) {
        const authError = error as { code: string; message: string };

        switch (authError.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-credential': // Combined handling for new Firebase versions
            errorMessage = 'Email does not exist';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password';
            break;
          default:
            // Clean up Firebase-specific prefixes
            errorMessage = authError.message
              .replace('Firebase: ', '')
              .replace('auth/', '')
              .replace(/Error\s*\([^)]+\):\s*/, '');
        }
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Google login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      lastUserEmail.current = null;
    } catch (error) {
      toast.error('Could not logout');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, loginWithGoogle, logout, loading, authInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};