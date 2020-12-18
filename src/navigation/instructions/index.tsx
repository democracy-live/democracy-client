import React, { FC, useContext } from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import { InstructionsScreen } from '../../screens/instructions';
import { RootStackParamList } from '..';
import { RouteProp } from '@react-navigation/native';
import { InstructionsContext } from '../../context/instructions';
import { getReadableVersion } from 'react-native-device-info';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Instructions' | 'FistStartInstructions'
>;

type ScreenRouteProp = RouteProp<
  RootStackParamList,
  'Instructions' | 'FistStartInstructions'
>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export const Instructions: FC<Props> = ({ navigation, route }) => {
  const { setLastStartWithVersion } = useContext(InstructionsContext);
  const onDone =
    route.name === 'FistStartInstructions'
      ? () => {
          setLastStartWithVersion(getReadableVersion());
        }
      : navigation.goBack;
  return <InstructionsScreen onDone={onDone} />;
};

export const InstructionsScreenOptions: StackNavigationOptions = {
  headerShown: false,
};
