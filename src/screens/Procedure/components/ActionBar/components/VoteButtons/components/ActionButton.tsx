import React from 'react';
import styled from 'styled-components/native';
import SvgShare from 'assets/svgs/icons/Share';
import { LockIcon } from './Lock';
import SvgBell from './Bell';
import SvgBellSlash from './BellSlash';

// Pick<Slice, 'percent' | 'large'>
const VoteIconButtonWrapper = styled.TouchableOpacity<
  Pick<Props, 'selection' | 'voteSelection' | 'voted'>
>`
  width: 88px;
  height: 88px;

  border-color: rgba(21, 192, 99, 0.8);
  border-radius: ${88 / 2}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ selection, voteSelection, voted }) => {
    if ((voted || voteSelection) && selection !== voteSelection) {
      return 'grey';
    }
    switch (selection) {
      case 'NOTIFY':
        return '#f5a623';
      case 'SHARE':
        return '#b10dd3';
      default:
        return 'grey';
    }
  }};
`;

interface Props {
  voteSelection?: string;
  onPress: () => void;
  selection: string;
  voted?: boolean;
  style?: any;
  notify?: boolean;
}

const ActionButton: React.FC<Props> = ({
  voteSelection,
  onPress,
  selection,
  voted,
  style,
  notify,
}) => {
  let styleWrapper;
  let Icon;
  switch (selection) {
    case 'NOTIFY':
      styleWrapper = {
        borderColor: '#f5a623',
      };
      Icon = !notify ? (
        <SvgBell width={50} height={50} color="#fff" />
      ) : (
        <SvgBellSlash width={50} height={50} color="#fff" />
      );
      break;
    case 'SHARE':
      styleWrapper = {
        borderColor: '#b10dd3',
      };
      Icon = <SvgShare width={45} height={45} color="#fff" />;
      break;
    case 'UNKNOWN':
      Icon = <LockIcon />;
      break;

    default:
      break;
  }
  return (
    <VoteIconButtonWrapper
      voted={voted}
      disabled={!!(!onPress || voted)}
      selection={selection}
      voteSelection={voteSelection}
      onPress={onPress}
      style={{ ...styleWrapper, ...style }}>
      {Icon}
    </VoteIconButtonWrapper>
  );
};

export default ActionButton;
