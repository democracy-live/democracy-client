import React from 'react';
// import 'lib/wdyr';
import { Navigation } from './navigation';
import { InstructionsProvider } from './context/instructions';
import { lightTheme, darkTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { useColorScheme } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { client } from 'lib/apollo';
import { VerificationProvider } from 'context/Verification';
import { AuthProvider } from 'context/Auth';
import { ConstituencyProvider } from 'context/constituency';
import { LocalVotesProvider } from 'context/LocalVotes';
import { NotificationsProvider } from 'context/NotificationPermission';

declare const global: { HermesInternal: null | {} };

const App = () => {
  const themeMode = useColorScheme();

  return (
    <InstructionsProvider>
      <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        <ApolloProvider client={client}>
          <LocalVotesProvider>
            <AuthProvider>
              <VerificationProvider>
                <NotificationsProvider>
                  <ConstituencyProvider>
                    <Navigation />
                  </ConstituencyProvider>
                </NotificationsProvider>
              </VerificationProvider>
            </AuthProvider>
          </LocalVotesProvider>
        </ApolloProvider>
      </ThemeProvider>
    </InstructionsProvider>
  );
};

export default App;
