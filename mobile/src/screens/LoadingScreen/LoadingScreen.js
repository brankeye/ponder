import React from 'react';
import { AuthConsumer } from '@@consumers';

class LoadingScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <AuthConsumer>
        {({ isAuthenticated }) => {
          console.log('auth: ', isAuthenticated);
          navigation.navigate(isAuthenticated ? 'App' : 'Landing');
          return null;
        }}
      </AuthConsumer>
    );
  }
}

export default LoadingScreen;
