import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import Chart from './HeaderChart';

const Wrapper = styled.View`
  flex-direction: row;
  padding-horizontal: 18px;
`;

const TimeSelect = styled.View`
  flex: 1;
`;

const ProcedureCount = styled.View`
  padding-right: 9px;
`;

const ProcedureCountText = styled.Text`
  font-size: 15px;
  color: #6d6d72;
  font-weight: 500;
`;

interface Props {
  totalProcedures: number;
  votedProceduresCount: number;
}

class WomHeader extends PureComponent<Props> {
  render() {
    const { totalProcedures, votedProceduresCount } = this.props;
    return (
      <Wrapper>
        <TimeSelect />
        <ProcedureCount>
          <ProcedureCountText>
            {votedProceduresCount}/{totalProcedures}
          </ProcedureCountText>
        </ProcedureCount>
        <Chart
          value={(votedProceduresCount / totalProcedures) * 100}
          width={20}
        />
      </Wrapper>
    );
  }
}

export default WomHeader;
