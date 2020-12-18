import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondaryText};
  padding-bottom: 0;
  flex-direction: row;
  margin-horizontal: 9px;
  max-width: 300px;
`;

const CountryNumber = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 0;
  padding-bottom: 0;
  padding-top: ${Platform.OS === 'ios' ? 0 : '7px'};
`;

const Number = styled.TextInput.attrs(() => ({
  placeholder: 'Deine Telefonnr.',
  keyboardType: Platform.OS === 'ios' ? 'number-pad' : 'numeric',
  maxLength: 13,
  returnKeyType: 'next',
}))`
  flex: 1;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 0;
  padding-bottom: 0;
  margin-left: 11px;
`;

interface Props {
  phoneNumber: string;
  onChange: (phoneNumber: string) => void;
}

export const PhonenumberInput: React.FC<Props> = ({
  phoneNumber = '',
  onChange,
}) => {
  const onChangeText = (text: string) => {
    const formattedPhoneNumber = text.replace(/[^0-9]/g, '');
    onChange(formattedPhoneNumber);
  };

  return (
    <Container>
      <CountryNumber>+49</CountryNumber>
      <Number
        multiline={false}
        autoFocus
        onChangeText={onChangeText}
        value={phoneNumber}
        textContentType="telephoneNumber"
        underlineColorAndroid="transparent"
        testID="VerificationPhoneInput"
      />
    </Container>
  );
};

export default PhonenumberInput;
