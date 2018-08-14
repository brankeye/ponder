import React from 'react';
import Expo, { Font } from 'expo';
import { ApolloProvider } from '@@utils/graphql';
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
        <ApolloProvider token={encodedToken}>
          <SettingsProvider>
            <SettingsConsumer>
              {({ theme: themeType }) => (
                <ThemeProvider type={themeType}>
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
