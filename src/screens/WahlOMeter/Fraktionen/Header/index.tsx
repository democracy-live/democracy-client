import { LocalVotesContext } from 'context/LocalVotes';
import React, { useContext } from 'react';
import { NoVotesPlaceholder } from 'screens/WahlOMeter/NoVotesPlaceholder';
import { WomFractionChart } from './WomFractionChart';

export const WomPartyHeader: React.FC = () => {
  const { localVotes } = useContext(LocalVotesContext);
  const localDecisions = localVotes.map(({ procedureId, selection }) => ({
    procedureId,
    selection,
  }));

  if (localVotes.length === 0) {
    return <NoVotesPlaceholder subline="Fraktionen" />;
  }

  return <WomFractionChart localVotes={localDecisions} />;
};
