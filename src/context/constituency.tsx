import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface ConstituencyInterface {
  constituency: string;
  setConstituency: (constituency: string) => void;
}

const defaults: ConstituencyInterface = {
  constituency: '',
  setConstituency: () => {
    throw new Error(
      'ConstituencyContext: setConstituency function is not defined',
    );
  },
};

export const ConstituencyContext = createContext<ConstituencyInterface>(
  defaults,
);

const STORAGE_KEY_CONSTITUENCY = 'Constituency';

export const ConstituencyProvider: React.FC = ({ children }) => {
  const [constituency, setConstituencyState] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_CONSTITUENCY).then((constituencyData) =>
      constituencyData ? setConstituencyState(constituencyData) : null,
    );
  }, []);

  const setConstituency = (newConstituency: string) => {
    AsyncStorage.setItem(STORAGE_KEY_CONSTITUENCY, newConstituency).then(() =>
      setConstituencyState(newConstituency),
    );
  };

  return (
    <ConstituencyContext.Provider
      value={{
        constituency,
        setConstituency,
      }}>
      {children}
    </ConstituencyContext.Provider>
  );
};
