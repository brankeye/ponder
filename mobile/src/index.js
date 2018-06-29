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
  StylesProvider,
  withAuth,
} from '@@consumers';

const getActiveRoute = navigationState => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
};

const onNavigationStateChange = (prevState, currentState) => {
  const currentScreen = getActiveRoute(currentState);
  const prevScreen = getActiveRoute(prevState);

  if (prevScreen.routeName !== currentScreen.routeName) {
    prevScreen.params = prevScreen.params || {};
    currentScreen.params = currentScreen.params || {};
    prevScreen.params.isActive = false;
    currentScreen.params.isActive = true;
  }
};

class App extends React.Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    await Font.loadAsync({
      EBGaramond: require('@@assets/fonts/EBGaramond-Regular.ttf'),
      'EBGaramond-Bold': require('@@assets/fonts/EBGaramond-Bold.ttf'),
      'EBGaramond-Italic': require('@@assets/fonts/EBGaramond-Italic.ttf'),
      Vollkorn: require('@@assets/fonts/Vollkorn-Regular.ttf'),
      'Vollkorn-Bold': require('@@assets/fonts/Vollkorn-Bold.ttf'),
      'Vollkorn-Italic': require('@@assets/fonts/Vollkorn-Italic.ttf'),
      Crimson: require('@@assets/fonts/CrimsonText-Regular.ttf'),
      'Crimson-Bold': require('@@assets/fonts/CrimsonText-Bold.ttf'),
      'Crimson-Italic': require('@@assets/fonts/CrimsonText-Italic.ttf'),
    });
    await this.props.auth.loadAsync();
    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.loading) return null;

    return (
      <React.Fragment>
        <StatusBar />
        <MainNavigator onNavigationStateChange={onNavigationStateChange} />
      </React.Fragment>
    );
  }
}

const withProviders = WrappedComponent => () => (
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
                      <StylesProvider context={theme}>
                        <WrappedComponent />
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

Expo.registerRootComponent(withProviders(withAuth(App)));
