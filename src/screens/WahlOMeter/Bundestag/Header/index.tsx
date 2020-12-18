import { LocalVotesContext } from 'context/LocalVotes';
import React, { useContext } from 'react';
import { NoVotesPlaceholder } from 'screens/WahlOMeter/NoVotesPlaceholder';
import { WomBundestagPieChart } from './PieChart';

export const WomBundestagHeader: React.FC = () => {
  const { localVotes } = useContext(LocalVotesContext);
  const localDecisions = localVotes.map(({ procedureId, selection }) => ({
    procedureId,
    selection,
  }));

  if (localVotes.length === 0) {
    return <NoVotesPlaceholder subline="Bundestag" />;
  }

  return <WomBundestagPieChart localVotes={localDecisions} />;
};
