import React from 'react';
import Expo, { AppLoading, Font } from 'expo';
import { ApolloProvider } from 'react-apollo';
import client from '@@graphql';
import AppNavigator from '@@screens';
import { StatusBar } from '@@components';
import { ThemeProvider, PropsProvider } from '@@consumers';

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

class App extends React.Component {
  state = {
    loading: true,
  };

  load = () =>
    Promise.all(
      Font.loadAsync({
        EBGaramond: require('@@assets/fonts/EBGaramond-Regular.ttf'),
        'EBGaramond-Bold': require('@@assets/fonts/EBGaramond-Bold.ttf'),
        'EBGaramond-Italic': require('@@assets/fonts/EBGaramond-Italic.ttf'),
        Vollkorn: require('@@assets/fonts/Vollkorn-Regular.ttf'),
        'Vollkorn-Bold': require('@@assets/fonts/Vollkorn-Bold.ttf'),
        'Vollkorn-Italic': require('@@assets/fonts/Vollkorn-Italic.ttf'),
        Crimson: require('@@assets/fonts/CrimsonText-Regular.ttf'),
        'Crimson-Bold': require('@@assets/fonts/CrimsonText-Bold.ttf'),
        'Crimson-Italic': require('@@assets/fonts/CrimsonText-Italic.ttf'),
      })
    );

  finishLoading = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <AppLoading
          startAsync={this.load}
          onFinish={this.finishLoading}
          onError={console.warn}
        />
      );
    }

    return (
      <ApolloProvider client={client}>
        <ThemeProvider>
          <PropsProvider>
            <React.Fragment>
              <StatusBar />
              <AppNavigator
                onNavigationStateChange={(prevState, currentState) => {
                  const currentScreen = getActiveRoute(currentState);
                  const prevScreen = getActiveRoute(prevState);

                  if (prevScreen.routeName !== currentScreen.routeName) {
                    prevScreen.params = prevScreen.params || {};
                    currentScreen.params = currentScreen.params || {};
                    prevScreen.params.isActive = false;
                    currentScreen.params.isActive = true;
                  }
                }}
              />
            </React.Fragment>
          </PropsProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

Expo.registerRootComponent(App);
