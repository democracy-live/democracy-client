import React from 'react';
import styled from 'styled-components/native';

enum BackgroundColors {
  transparent = 'transparent',
  blue = '#4494d3',
  lightBlue = '#9AC5E7',
  red = '#ec3e31',
}
interface ContainerProps {
  color: keyof typeof BackgroundColors;
  disabled?: boolean;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  background-color: ${({ color, disabled }) =>
    disabled ? '#979797' : BackgroundColors[color]};
  height: 60px;
  justify-content: center;
  border-radius: 2px;
  margin-top: 11px;
`;

enum TextColors {
  blue = '#0076ff',
  white = '#fff',
  red = '#d0021b',
}

interface TextProps {
  color: keyof typeof TextColors;
}
const ButtonText = styled.Text<TextProps>`
  text-align: center;
  color: ${({ color }) => TextColors[color]};
  font-size: 17px;
  padding-horizontal: 11px;
`;

interface Props {
  text: string;
  onPress: () => void;
  textColor: keyof typeof TextColors;
  backgroundColor?: keyof typeof BackgroundColors;
  disabled?: boolean;
  style?: any; // TODO improve typescript
  testID?: string;
}

export const Button: React.FC<Props> = ({
  text,
  onPress,
  textColor,
  backgroundColor = 'transparent',
  disabled,
  style,
  testID,
}) => (
  <Container
    style={style}
    disabled={disabled}
    onPress={onPress}
    color={backgroundColor}
    testID={testID}>
    <ButtonText testID="ButtonText" color={textColor}>
      {text}
    </ButtonText>
  </Container>
);
