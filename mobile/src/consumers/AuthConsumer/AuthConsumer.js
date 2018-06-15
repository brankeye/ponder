import React from 'react';
import { Auth } from '@@utils';
import { FACEBOOK_APP_ID } from '@@config';
import Expo from 'expo';

const { Provider, Consumer } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    accessToken: null,
    encodedToken: null,
    isAuthenticated: false,
  };

  async componentDidMount() {
    const token = await Auth.getToken();
    if (token) {
      const { accessToken, encodedToken } = token;
      this.setState({ accessToken, encodedToken, isAuthenticated: true });
      console.log('Already authenticated...');
    } else {
      const clientId = Expo.Constants.deviceId;
      const token = { clientId };
      const encodedToken = Auth.encodeToken(token);
      await Auth.saveToken({ encodedToken });
      console.log('Success: ', { clientId, encodedToken });
      this.setState({ encodedToken, isAuthenticated: true });
    }
  }

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
          isAuthenticated: this.state.isAuthenticated,
          accessToken: this.state.accessToken,
          encodedToken: this.state.encodedToken,
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
