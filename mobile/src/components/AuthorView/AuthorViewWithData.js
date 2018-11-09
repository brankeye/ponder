import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import AuthorView from './AuthorView';

class AuthorViewWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { id, discover, ...props } = this.props;
    return discover ? (
      <Query query={AuthorDiscoverQuery}>
        {({ loading, error, data: { author } }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return <AuthorView {...props} author={author} />;
        }}
      </Query>
    ) : (
      <Query query={AuthorQuery} variables={{ id }}>
        {({ loading, error, data: { author } }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return <AuthorView {...props} author={author} />;
        }}
      </Query>
    );
  }
}

export const AuthorQuery = gql`
  query Author($id: ID!) {
    author(id: $id) {
      id
      name
      inLibrary
      poems {
        id
        title
        teaser
        lines
        inLibrary
      }
    }
  }
`;

export const AuthorDiscoverQuery = gql`
  query AuthorDiscover {
    author: authorDiscover {
      id
      name
      inLibrary
      poems {
        id
        title
        teaser
        lines
        inLibrary
      }
    }
  }
`;

export default AuthorViewWithData;
