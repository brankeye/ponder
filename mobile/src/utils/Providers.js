import React from 'react';
import Expo, { Font } from 'expo';
import { ApolloProvider } from 'react-apollo';
import client from '@@graphql';
import MainNavigator from '@@screens';
import { StatusBar } from '@@components';
import {
  AuthProvider,
  AuthConsumer,
  ThemeProvider,
  ThemeConsumer,
  SettingsProvider,
  SettingsConsumer,
  withAuth,
} from '@@consumers';
import { StylesProvider } from 'react-native-paint';

const AppProviders = ({ children }) => (
  <AuthProvider>
    <AuthConsumer>
      {({ encodedToken }) => (
        <ApolloProvider client={client({ encodedToken })}>
          <SettingsProvider>
            <SettingsConsumer>
              {({ themeType, toggleTheme }) => (
                <ThemeProvider type={themeType} onThemeToggled={toggleTheme}>
                  <ThemeConsumer>
                    {({ theme }) => (
                      <StylesProvider id={themeType} theme={theme}>
                        {children}
                      </StylesProvider>
                    )}
                  </ThemeConsumer>
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </ApolloProvider>
      )}
    </AuthConsumer>
  </AuthProvider>
);

export default AppProviders;
