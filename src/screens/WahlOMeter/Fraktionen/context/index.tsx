import React, { createContext, useState } from 'react';

interface WomPartyInterface {
  party: string;
  setWomParty: (party: string) => void;
}

const defaults: WomPartyInterface = {
  party: '',
  setWomParty: () => {
    throw new Error('WomPartyContext: setWomParty function is not defined');
  },
};

export const WomPartyContext = createContext<WomPartyInterface>(defaults);

export const WomPartyProvider: React.FC = ({ children }) => {
  const [party, setWomParty] = useState('');

  return (
    <WomPartyContext.Provider
      value={{
        party,
        setWomParty,
      }}>
      {children}
    </WomPartyContext.Provider>
  );
};
