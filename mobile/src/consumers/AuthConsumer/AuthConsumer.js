import React from 'react';
import { Auth } from '@@utils';
import { FACEBOOK_APP_ID } from '@@config';
import Expo from 'expo';
import { Promise } from 'core-js';

const { Provider, Consumer } = React.createContext();

class AuthProvider extends React.Component {
  state = {
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
    }
  }

  setStateAsync = newState => {
    return new Promise(resolve => {
      this.setState(newState, resolve);
    });
  };

  signInAnonymously = async () => {
    const clientId = Expo.Constants.deviceId;
    const token = { clientId };
    const encodedToken = Auth.encodeToken(token);
    await Auth.saveToken({ encodedToken });
    console.log('Success: ', { clientId, encodedToken });
    this.setState({ encodedToken, isAuthenticated: true });
  };

  signInWithFacebook = async () => {
    const {
      type,
      token,
      expires,
    } = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID);
    switch (type) {
      case 'cancel': {
        console.log('Cancel: ', { type });
        return { type };
      }
      case 'success': {
        const accessToken = { provider: 'facebook', token, expires };
        const encodedToken = Auth.encodeToken(accessToken);
        await Auth.saveToken({ accessToken, encodedToken });
        console.log('Success: ', { type, token, expires });
        this.setState({ accessToken, encodedToken, isAuthenticated: true });
        return { type, accessToken, encodedToken };
      }
    }
  };

  render() {
    return (
      <Provider
        value={{
          loadAsync: this.loadAsync,
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
