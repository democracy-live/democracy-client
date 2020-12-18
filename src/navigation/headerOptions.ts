import { getTheme } from 'styles/theme';
import { DefaultTheme } from 'styled-components/native';

export const headerScreenOptions = {
  headerStyle: {
    backgroundColor: getTheme().colors.header,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerBackTitleVisible: false,
  headerTintColor: getTheme().colors.white,
};

export const getHeaderScreenOptions = (theme: DefaultTheme = getTheme()) => ({
  headerStyle: {
    backgroundColor: theme.colors.header,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerBackTitleVisible: false,
  headerTintColor: theme.colors.white,
});
