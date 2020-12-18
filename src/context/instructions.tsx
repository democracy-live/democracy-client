import React, { createContext, useState, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface InstructionsInterface {
  lastStartWithVersion: string | undefined;
  setLastStartWithVersion: (version: string) => void;
  isLoading: boolean;
}

const defaults: InstructionsInterface = {
  lastStartWithVersion: '',
  setLastStartWithVersion: () => {
    throw new Error(
      'InstructionsContext: setLastStartVersion function is not defined',
    );
  },
  isLoading: true,
};

export const InstructionsContext = createContext<InstructionsInterface>(
  defaults,
);

export const InstructionsProvider: FC = ({ children }) => {
  const [lastStartVersion, setLastStartVersion] = useState<
    InstructionsInterface['lastStartWithVersion']
  >();

  useEffect(() => {
    AsyncStorage.getItem('lastStartWithVersion').then((version) =>
      version ? setLastStartVersion(version) : setLastStartVersion(''),
    );
  }, []);

  const setLastStartWithVersion = (verstion: string) => {
    AsyncStorage.setItem('lastStartWithVersion', verstion).then(() => {
      setLastStartVersion(verstion);
    });
  };

  return (
    <InstructionsContext.Provider
      value={{
        lastStartWithVersion: lastStartVersion,
        setLastStartWithVersion,
        isLoading: lastStartVersion === undefined,
      }}>
      {children}
    </InstructionsContext.Provider>
  );
};
