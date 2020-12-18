import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { VerificationStart } from 'screens/Verification';
import { PhoneNumber } from 'screens/Verification/PhoneNumber';
import { CodeInputScreen } from 'screens/Verification/Code';
import { SmsDonateScreen } from 'screens/Verification/Donate';

export type VerificationStackParamList = {
  VerificationIntro: undefined;
  VerificationPhoneInput: undefined;
  VerificationCodeInput: { procedureId?: string };
  VerificationDonation: undefined;
};

const Stack = createStackNavigator<VerificationStackParamList>();

export const VerificationNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VerificationIntro"
        component={VerificationStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerificationPhoneInput"
        component={PhoneNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerificationCodeInput"
        component={CodeInputScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerificationDonation"
        component={SmsDonateScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
