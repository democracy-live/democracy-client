import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { AuthContext } from 'context/Auth';
import { useNavigation } from '@react-navigation/native';

const VerificationTouch = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
`;

interface Props {}

export const VerifyOverlay: React.FC<Props> = ({}) => {
  const { isVerified } = useContext(AuthContext);
  const { navigate } = useNavigation();

  const verify = () => {
    navigate('Verification');
  };

  if (isVerified) {
    return null;
  }
  return <VerificationTouch onPress={verify} testID="VerificationTouch" />;
};
