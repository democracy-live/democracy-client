import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import { sha256 } from 'react-native-sha256';
import DeviceInfo from 'react-native-device-info';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client';

interface JwtObject {
  exp: number;
}

export const authLinkMiddleware = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('auth_token');
  const refreshToken = await AsyncStorage.getItem('auth_refreshToken');

  if (token && refreshToken) {
    const decodedToken = jwtDecode<JwtObject>(token);
    const decodedRefreshToken = jwtDecode<JwtObject>(refreshToken);

    const currentTime = Date.now() / 1000;
    if (
      decodedToken.exp >= currentTime ||
      decodedRefreshToken.exp >= currentTime
    ) {
      // Token valid
      return {
        headers: {
          ...headers,
          'x-token': token,
          'x-refresh-token': refreshToken,
        },
      };
    }
  }
  // No (valid) Token present - login
  const deviceHash = await sha256(await DeviceInfo.getUniqueId());
  const phoneHash = await AsyncStorage.getItem('auth_phoneHash');
  const newHeaders = {
    ...headers,
    'x-device-hash': deviceHash,
  };
  if (phoneHash) {
    newHeaders['x-phone-hash'] = phoneHash;
  }
  return { headers: newHeaders };
});

export const authLinkAfterware = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const res = operation.getContext().response;
    // Do we have a response?
    if (res) {
      const { headers } = res;
      // Do we have headers?
      if (headers) {
        // Extract tokens from Headers & save them
        const token = headers.get('x-token');
        const refreshToken = headers.get('x-refresh-token');
        if (token) {
          AsyncStorage.setItem('auth_token', token);
        }

        if (refreshToken) {
          AsyncStorage.setItem('auth_refreshToken', refreshToken);
        }
      }
    }
    return response;
  }),
);
