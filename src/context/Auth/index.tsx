import React, { createContext, useState, FC, useEffect } from 'react';
import { useMeQuery } from 'generated/graphql';

interface AuthInterface {
  isVerified: boolean;
  loading: boolean;
  refetch: () => void;
}

const defaults: AuthInterface = {
  isVerified: false,
  loading: true,
  refetch: () => {
    throw new Error('AuthContext: refetch function is not defined');
  },
};

export const AuthContext = createContext<AuthInterface>(defaults);

export const AuthProvider: FC = ({ children }) => {
  const { data, refetch, loading } = useMeQuery();
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.me) {
      setIsVerified(data.me.verified);
    }
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isVerified,
        refetch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
