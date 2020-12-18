import { LocalVotesContext } from 'context/LocalVotes';
import React, { useContext } from 'react';
import { NoVotesPlaceholder } from 'screens/WahlOMeter/NoVotesPlaceholder';
import { WomDeputy } from './Deputy';

export const WomConstituencyHeader: React.FC = () => {
  const { localVotes } = useContext(LocalVotesContext);
  const localDecisions = localVotes.map(({ procedureId, selection }) => ({
    procedureId,
    selection,
  }));

  if (localVotes.length === 0) {
    return <NoVotesPlaceholder subline="Wahlkreis" />;
  }
  return <WomDeputy localVotes={localDecisions} />;
};
