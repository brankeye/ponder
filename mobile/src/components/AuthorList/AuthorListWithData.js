import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { View } from 'react-native';
import { AuthorList } from '@@components';

class AuthorListWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { type, count, search, ...props } = this.props;
    return (
      <Query
        query={AuthorListQuery}
        variables={{ from: type, first: count, search }}
      >
        {({
          loading,
          error,
          data: {
            authorList: {
              edges,
              pageInfo: { endCursor, hasNextPage } = {},
            } = {},
          },
          fetchMore,
        }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <AuthorList
              {...props}
              authors={edges.map(({ node }) => ({ ...node }))}
              onEndReached={() => {
                hasNextPage &&
                  fetchMore({
                    query: AuthorListQuery,
                    variables: {
                      from: type,
                      first: count,
                      after: endCursor,
                      search,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.authorList.edges;
                      const pageInfo = fetchMoreResult.authorList.pageInfo;
                      return pageInfo.hasNextPage
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

export const AuthorListQuery = gql`
  query AuthorList(
    $from: AuthorCategory!
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    authorList(
      from: $from
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "authorList", filter: ["from", "search"]) {
      edges {
        node {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export default AuthorListWithData;
