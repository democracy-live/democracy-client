import 'react-native-gesture-handler';
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';
import { Instructions, InstructionsScreenOptions } from './instructions';
import { InstructionsContext } from '../context/instructions';
import { getReadableVersion } from 'react-native-device-info';
import { Sidebar } from './Sidebar';
import { enableScreens } from 'react-native-screens';
import { PdfScreen, PdfScreenOptions } from 'screens/Pdf';
import { VerificationNavigation } from './verification';
enableScreens();

export type RootStackParamList = {
  Sidebar: undefined;
  FistStartInstructions: undefined;
  Instructions: undefined;
  Verification: undefined;
  Pdf: { url: string; title: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const { lastStartWithVersion } = useContext(InstructionsContext);
  const [showInstructions, setShowInstructions] = useState<boolean>();

  useEffect(() => {
    if (lastStartWithVersion === getReadableVersion()) {
      setShowInstructions(false);
    } else if (lastStartWithVersion !== undefined) {
      setShowInstructions(true);
    }
  }, [lastStartWithVersion]);

  if (showInstructions === undefined) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        {showInstructions ? (
          <Stack.Screen
            name="FistStartInstructions"
            component={Instructions}
            options={InstructionsScreenOptions}
          />
        ) : (
          <>
            <Stack.Screen
              name="Sidebar"
              component={Sidebar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Instructions"
              component={Instructions}
              options={InstructionsScreenOptions}
            />
            <Stack.Screen
              name="Verification"
              component={VerificationNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Pdf"
              component={PdfScreen}
              options={PdfScreenOptions}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
