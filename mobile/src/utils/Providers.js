import React from 'react';
import Expo, { Font } from 'expo';
import { ApolloProvider } from '@@utils/graphql';
import MainNavigator from '@@screens';
import { StatusBar } from '@@components';
import {
  AuthProvider,
  ThemeProvider,
  ThemeConsumer,
  withAuth,
} from '@@consumers';
import { StylesProvider } from 'react-native-paint';
import { Constants } from 'expo';
import { Buffer } from 'buffer';

const authorization = Buffer.from(Constants.deviceId).toString('base64');

const AppProviders = ({ children }) => (
  <ApolloProvider authorization={authorization}>
    <ThemeProvider>
      <ThemeConsumer>
        {({ theme }) => (
          <StylesProvider id={theme.type} theme={theme}>
            {children}
          </StylesProvider>
        )}
      </ThemeConsumer>
    </ThemeProvider>
  </ApolloProvider>
);

export default AppProviders;
