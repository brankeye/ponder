import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class LoadingScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Query>
        {({ loading, data: { user } }) => {
          if (loading) return null;
          navigation.navigate('App');
          return null;
        }}
      </Query>
    );
  }
}

const UserQuery = gql`
  query User {
    user {
      id
    }
  }
`;

export default LoadingScreen;
