import React, { useContext } from 'react';
import styled from 'styled-components/native';

// Components
import {
  ProfilFragmentDoc,
  useWomDeputyQuery,
  WomDeputyChartFragmentDoc,
} from 'generated/graphql';
import { ConstituencyContext } from 'context/constituency';
import { DeputyProfile } from './Profil';
import { filter } from 'graphql-anywhere';
import { LocalVotesContext } from 'context/LocalVotes';
import { WomDeputyChart } from './Chart';
import { VotesProgress } from 'screens/WahlOMeter/components/VotesProgress';

const Wrapper = styled.View`
  padding-top: 18px;
`;

const ChartWrapper = styled.View`
  align-items: center;
`;
interface LocalVote {
  procedureId: string;
  selection: 'YES' | 'NO' | 'ABSTINATION';
}

interface Props {
  localVotes: LocalVote[];
}

export const WomDeputy: React.FC<Props> = () => {
  const { constituency } = useContext(ConstituencyContext);
  const { localVotes } = useContext(LocalVotesContext);
  const { data } = useWomDeputyQuery({
    variables: {
      constituency,
      directCandidate: true,
      procedureIds: localVotes.map((lv) => lv.procedureId),
    },
  });

  if (!data || !data.womDeputy[0]) {
    return null;
  }
  return (
    <Wrapper>
      <VotesProgress
        completed={data.womDeputy[0].procedures.length || 0}
        total={data.womDeputy[0].totalProcedures || 0}
      />
      <ChartWrapper>
        <DeputyProfile {...filter(ProfilFragmentDoc, data.womDeputy[0])} />
      </ChartWrapper>
      <WomDeputyChart
        {...filter(WomDeputyChartFragmentDoc, data.womDeputy[0])}
      />
    </Wrapper>
  );
};
