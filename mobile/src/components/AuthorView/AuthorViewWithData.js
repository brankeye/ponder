import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { authorQuery } from '@@graphql';
import AuthorView from './AuthorView';

class AuthorViewWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { id, ...props } = this.props;
    return (
      <Query query={authorQuery} variables={{ id }}>
        {({ loading, error, data: { author } }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return <AuthorView {...props} author={author} />;
        }}
      </Query>
    );
  }
}

export default AuthorViewWithData;
