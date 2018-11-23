import React from 'react';
import { ApolloProvider } from './graphql';
import { ThemeProvider, ThemeConsumer } from './theme';
import { StylesProvider } from 'react-native-paint';

const Providers = ({ children }) => (
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

export default Providers;
