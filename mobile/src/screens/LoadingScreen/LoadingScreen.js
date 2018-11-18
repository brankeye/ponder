import React from 'react';
import { Loading } from '@@components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class LoadingScreen extends React.Component {
  handleNavigation = () => this.props.navigation.navigate('App');

  render() {
    return (
      <Query
        query={UserQuery}
        fetchPolicy={'network-only'}
        onCompleted={this.handleNavigation}
      >
        {() => <Loading />}
      </Query>
    );
  }
}

const UserQuery = gql`
  query User {
    user {
      id
      theme
    }
  }
`;

export default LoadingScreen;
