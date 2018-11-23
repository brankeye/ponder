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

const AppProviders = ({ children }) => (
  <ApolloProvider>
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
