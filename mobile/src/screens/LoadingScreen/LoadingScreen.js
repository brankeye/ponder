import React from 'react';
import { AuthConsumer } from '@@consumers';

class LoadingScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <AuthConsumer>
        {({ loading, isAuthenticated }) => {
          if (loading) return null;
          console.log('auth: ', isAuthenticated);
          navigation.navigate(isAuthenticated ? 'App' : 'Landing');
          return null;
        }}
      </AuthConsumer>
    );
  }
}

export default LoadingScreen;
