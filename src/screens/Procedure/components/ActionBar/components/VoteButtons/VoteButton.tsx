import SvgLock from 'assets/svgs/icons/Lock';
import React from 'react';
import styled from 'styled-components/native';

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
      case 'YES':
        return '#15C063';
      case 'ABSTINATION':
        return '#2C82E4';
      case 'NO':
        return '#EC3E31';
      default:
        return 'grey';
    }
  }};
`;

const LockIconWrapper = styled.View`
  position: absolute;
  top: -3px;
  right: -3px;
  background-color: rgba(255, 255, 255, 0.9);
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border-width: 1px;
  border-style: dashed;
  border-color: rgba(0, 0, 0, 0.3);
`;

const VoteIconButton = styled.Image.attrs(() => ({
  flex: 1,
  resizeMode: 'contain',
  width: null,
  height: null,
}))`
  width: 40px;
  height: 40px;
`;

interface Props {
  voteSelection?: string;
  onPress?: () => void;
  selection: string;
  voted?: boolean;
  style?: any;
}

const VoteButton: React.FC<Props> = ({
  voteSelection,
  onPress,
  selection,
  voted,
  style,
}) => {
  let styleWrapper;
  let styleButton;
  switch (selection) {
    case 'YES':
      styleButton = {
        marginBottom: 5,
      };
      break;
    case 'ABSTINATION':
      styleWrapper = {
        borderColor: 'rgba(44, 130, 228, 0.8)',
      };
      styleButton = {
        transform: [{ rotate: '-90deg' }],
        marginRight: 5,
      };

      break;
    case 'NO':
      styleWrapper = {
        borderColor: 'rgba(236, 62, 49, 0.8)',
      };
      styleButton = {
        transform: [{ rotate: '180deg' }],
        marginTop: 5,
      };
      break;
    case 'UNKNOWN':
      styleButton = {
        transform: [{ rotate: '180deg' }],
        marginTop: 5,
      };
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
      {voted && (
        <LockIconWrapper>
          <SvgLock width={18} height={18} color="#bbb" />
        </LockIconWrapper>
      )}
      <VoteIconButton
        style={styleButton}
        source={require('./assets/thumbsUp.png')}
      />
    </VoteIconButtonWrapper>
  );
};

export default VoteButton;
