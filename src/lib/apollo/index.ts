import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import introspection from 'generated/possible-types';
import { authLinkAfterware, authLinkMiddleware } from './Auth';
import { typePolicies } from './typePolicies';
import { versionLinkMiddleware } from './Version';
import Config from 'react-native-config';

console.log(Config);

const httpLink: any = new HttpLink({
  uri: Config.API_ENDPOINT,
});

const link = ApolloLink.from([
  // retryLink,
  // errorLink,
  versionLinkMiddleware,
  authLinkMiddleware,
  authLinkAfterware,
  httpLink,
]);

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link,
  cache: new InMemoryCache({
    possibleTypes: introspection.possibleTypes,
    typePolicies,
  }),
});
