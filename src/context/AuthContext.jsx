import { useMemo, useState } from 'react';
import { clearStoredUser, getStoredUser, storeUser } from '../utils/storage.js';
import { AuthContext } from './auth-context.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  const value = useMemo(
    () => ({
      user,
      login: (credentials) => {
        const nextUser = {
          name: credentials.name.trim(),
          role: credentials.role.trim(),
          loggedAt: new Date().toISOString(),
        };

        storeUser(nextUser);
        setUser(nextUser);
      },
      logout: () => {
        clearStoredUser();
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
