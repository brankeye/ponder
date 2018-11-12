import React from 'react';
import Expo, { Font } from 'expo';
import MainNavigator from '@@screens';
import { Providers } from '@@utils';
import { StatusBar } from '@@components';
import {
  AuthProvider,
  ThemeProvider,
  ThemeConsumer,
  withAuth,
} from '@@consumers';
import { StylesProvider } from 'react-native-paint';
//import Reactotron from 'reactotron-react-native';

//Reactotron.configure({ host: '192.168.0.106' }).useReactNative();

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

  componentWillMount() {
    //Reactotron.connect();
  }

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
    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.loading) return null;

    return (
      <Providers>
        <React.Fragment>
          <StatusBar />
          <MainNavigator onNavigationStateChange={onNavigationStateChange} />
        </React.Fragment>
      </Providers>
    );
  }
}

Expo.registerRootComponent(App);
