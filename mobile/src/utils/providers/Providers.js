import React from 'react';
import { ApolloProvider } from './graphql';
import { SettingsProvider, SettingsConsumer } from './settings';
import { StylesProvider } from 'react-native-paint';

const Providers = ({ children }) => (
  <ApolloProvider>
    <SettingsProvider>
      <SettingsConsumer>
        {({ theme }) => (
          <StylesProvider id={theme.type} theme={theme}>
            {children}
          </StylesProvider>
        )}
      </SettingsConsumer>
    </SettingsProvider>
  </ApolloProvider>
);

export default Providers;
