import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import { authorListQuery } from '@@graphql';
import { AuthorList } from '@@components';

class AuthorListWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { type, count, ...props } = this.props;
    return (
      <Query query={authorListQuery} variables={{ from: type, first: count }}>
        {({
          loading,
          error,
          data: { authorList: { edges, pageInfo: { endCursor } = {} } = {} },
          fetchMore,
        }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <AuthorList
              {...props}
              authors={edges.map(({ node }) => ({ ...node }))}
              onFetchMore={() => {
                fetchMore({
                  query: authorListQuery,
                  variables: { from: type, first: count, after: endCursor },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.authorList.edges;
                    const pageInfo = fetchMoreResult.authorList.pageInfo;
                    return newEdges.length
                      ? {
                          authorList: {
                            __typename: previousResult.authorList.__typename,
                            edges: [
                              ...previousResult.authorList.edges,
                              ...newEdges,
                            ],
                            pageInfo,
                          },
                        }
                      : previousResult;
                  },
                });
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default AuthorListWithData;
