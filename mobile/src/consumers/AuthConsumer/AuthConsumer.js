import React from 'react';
import { Auth } from '@@utils';
import { FACEBOOK_APP_ID } from '@@config';
import Expo from 'expo';
import { Promise } from 'core-js';

const { Provider, Consumer } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    loading: true,
    accessToken: null,
    encodedToken: null,
    isAuthenticated: false,
  };

  async componentDidMount() {
    const token = await Auth.getToken();
    console.log({ token });
    if (token) {
      const { accessToken, encodedToken } = token;
      console.log({ accessToken, encodedToken });
      await this.setStateAsync({
        accessToken,
        encodedToken,
        isAuthenticated: true,
        loading: false,
      });
      console.log('Already authenticated...');
    } else {
      await this.setStateAsync({
        isAuthenticated: false,
        loading: false,
      });
      console.log('Not authenticated...');
    }
  }

  setStateAsync = newState => {
    return new Promise(resolve => {
      this.setState(newState, resolve);
    });
  };

  signInAnonymously = async () => {
    const encodedToken = Auth.encodeToken(Expo.Constants.deviceId);
    await Auth.saveToken({ encodedToken });
    console.log('Success: ', { clientId, encodedToken });
    this.setState({ encodedToken, isAuthenticated: true });
  };

  render() {
    return (
      <Provider
        value={{
          loading: this.state.loading,
          isAuthenticated: this.state.isAuthenticated,
          accessToken: this.state.accessToken,
          encodedToken: this.state.encodedToken,
          signInAnonymously: this.signInAnonymously,
          signInWithFacebook: this.signInWithFacebook,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const AuthConsumer = Consumer;
export { AuthProvider, AuthConsumer };
