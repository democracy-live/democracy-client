import { ConstituencyContext } from 'context/constituency';
import React, { useContext } from 'react';
import { VoteVarificationNoConstituency } from 'screens/Voting/components/NoConstituency';
import { WomConstituencyList } from './List';

export const WomConstituencyScreen: React.FC = () => {
  const { constituency } = useContext(ConstituencyContext);

  if (!constituency) {
    return <VoteVarificationNoConstituency />;
  }
  return <WomConstituencyList />;
};
