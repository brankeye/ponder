import React from 'react';
import Expo, { AppLoading, Font } from 'expo';
import { ApolloProvider } from 'react-apollo';
import client from '@@graphql';
import AppNavigator from '@@screens';
import { StatusBar } from '@@components';
import { ThemeProvider } from '@@consumers';

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
          <React.Fragment>
            <StatusBar />
            <AppNavigator />
          </React.Fragment>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

Expo.registerRootComponent(App);
