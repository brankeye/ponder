import React from 'react';
import { Loading } from '@@components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class LandingScreen extends React.Component {
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
    }
  }
`;

export default LandingScreen;
