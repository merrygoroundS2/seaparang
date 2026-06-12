import { createContext, useContext, useState } from 'react';
import { validInviteCode, validCredentials, mockUser } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isInvited, setIsInvited] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const verifyInviteCode = (code) => {
    const upperCode = code.toUpperCase();
    if (upperCode === 'SAEPARANG2026' || upperCode === 'SEAPARANG2026' || upperCode === validInviteCode) {
      setIsInvited(true);
      return true;
    }
    return false;
  };

  const login = (id, password) => {
    if (id === validCredentials.id && password === validCredentials.password) {
      setIsLoggedIn(true);
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isInvited, isLoggedIn, user, verifyInviteCode, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
