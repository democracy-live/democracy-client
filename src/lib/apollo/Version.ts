import DeviceInfo from 'react-native-device-info';
import { setContext } from '@apollo/client/link/context';

export const versionLinkMiddleware = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      version: DeviceInfo.getVersion(),
    },
  };
});
