import React from 'react';
import { ApolloProvider } from './graphql';
import { SettingsProvider, SettingsConsumer } from './settings';
import { ThemeProvider } from './theme';
import { StylesProvider } from 'react-native-paint';

const Providers = ({ children }) => (
  <ApolloProvider>
    <SettingsProvider>
      <SettingsConsumer>
        {({ theme }) => (
          <ThemeProvider theme={theme}>
            <StylesProvider id={theme.type} theme={theme}>
              {children}
            </StylesProvider>
          </ThemeProvider>
        )}
      </SettingsConsumer>
    </SettingsProvider>
  </ApolloProvider>
);

export default Providers;
