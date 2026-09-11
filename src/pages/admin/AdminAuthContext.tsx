import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../../types/property';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (username: string, pass: string) => boolean;
  loginAsUser: (userType: 'suresh' | 'monu') => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const STORAGE_KEY_AUTH = 'radhe_admin_session_v1';

const ADMIN_USERS: Record<'suresh' | 'monu', AdminUser> = {
  suresh: {
    id: 'user-01',
    name: 'Suresh Sharma',
    role: 'Owner & Founder',
    email: 'suresh.sharma@radherealestate.com',
  },
  monu: {
    id: 'user-02',
    name: 'Monu Sharma',
    role: 'Operational Manager',
    email: 'monu.sharma@radherealestate.com',
  },
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading auth state:', e);
    }
    // Default logged in as Suresh Sharma for convenient access
    return ADMIN_USERS.suresh;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
  }, [user]);

  const login = (username: string, pass: string): boolean => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (
      (cleanUser === 'admin' || cleanUser === 'suresh' || cleanUser === 'suresh sharma') &&
      (cleanPass === 'radhe2026' || cleanPass === 'admin' || cleanPass === '123456')
    ) {
      setUser(ADMIN_USERS.suresh);
      return true;
    }

    if (
      (cleanUser === 'monu' || cleanUser === 'monu sharma') &&
      (cleanPass === 'radhe2026' || cleanPass === 'admin' || cleanPass === '123456')
    ) {
      setUser(ADMIN_USERS.monu);
      return true;
    }

    // Fallback general login
    if (cleanPass === 'radhe' || cleanPass === 'radhe2026' || cleanPass === 'admin') {
      setUser(ADMIN_USERS.suresh);
      return true;
    }

    return false;
  };

  const loginAsUser = (userType: 'suresh' | 'monu') => {
    setUser(ADMIN_USERS[userType]);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginAsUser,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
