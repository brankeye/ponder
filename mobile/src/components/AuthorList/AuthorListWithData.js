import React, { Component } from 'react';
import { Loading } from '@@components';
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
    const query = type === 'Library' ? AuthorLibraryQuery : AuthorRecentsQuery;
    return (
      <Query query={query} variables={{ first: count, search }}>
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
          if (loading) return <Loading />;
          if (error) return `Error!: ${error}`;
          return (
            <AuthorList
              {...props}
              authors={edges.map(({ node }) => node)}
              onEndReached={() => {
                hasNextPage &&
                  fetchMore({
                    query,
                    variables: {
                      first: count,
                      after: endCursor,
                      search,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.authorList.edges;
                      const pageInfo = fetchMoreResult.authorList.pageInfo;
                      return {
                        authorList: {
                          __typename: previousResult.authorList.__typename,
                          edges: [
                            ...previousResult.authorList.edges,
                            ...newEdges,
                          ],
                          pageInfo,
                        },
                      };
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

export const AuthorLibraryQuery = gql`
  query AuthorLibrary(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    authorList: authorLibrary(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "authorLibrary", filter: ["search"]) {
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

export const AuthorRecentsQuery = gql`
  query AuthorRecents(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    authorList: authorRecents(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "authorRecents", filter: ["search"]) {
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
