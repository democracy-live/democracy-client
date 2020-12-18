import React from 'react';
import styled from 'styled-components/native';
import Pdf from 'react-native-pdf';
import { useRoute, RouteProp } from '@react-navigation/core';
import { RootStackParamList } from 'navigation';
import { StackNavigationOptions } from '@react-navigation/stack';
import { getTheme } from 'styles/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const PdfViewer = styled(Pdf)`
  flex: 1;
`;

type PdfScreenRouteProp = RouteProp<RootStackParamList, 'Pdf'>;

export const PdfScreen: React.FC = () => {
  const route = useRoute<PdfScreenRouteProp>();
  const {
    params: { url },
  } = route;
  return (
    <Container>
      <PdfViewer
        maxScale={10}
        source={{
          uri: url.replace('.de:80', '.de'),
        }}
      />
    </Container>
  );
};

export const PdfScreenOptions = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Pdf'>;
  navigation: any;
}): StackNavigationOptions => ({
  headerShown: true,
  headerStyle: {
    backgroundColor: getTheme().colors.header,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerBackTitleVisible: false,
  headerTintColor: getTheme().colors.white,
  title: route.params.title,
});
