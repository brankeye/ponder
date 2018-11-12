import React, { Component } from 'react';
import { Loading } from '@@components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PoemList from './PoemList';

class PoemListWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { type, count, search, ...props } = this.props;
    const query = type === 'Library' ? PoemLibraryQuery : PoemRecentsQuery;
    return (
      <Query
        query={query}
        variables={{ first: count, search }}
        fetchPolicy={'network-only'}
      >
        {({
          loading,
          error,
          data: {
            poemList: { edges, pageInfo: { endCursor, hasNextPage } = {} } = {},
          },
          fetchMore,
        }) => {
          if (loading) return <Loading />;
          if (error) return `Error!: ${error}`;
          return (
            <PoemList
              {...props}
              poems={edges.map(({ node }) => node)}
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
                      const newEdges = fetchMoreResult.poemList.edges;
                      const pageInfo = fetchMoreResult.poemList.pageInfo;
                      return pageInfo.hasNextPage
                        ? {
                            poemList: {
                              __typename: previousResult.poemList.__typename,
                              edges: [
                                ...previousResult.poemList.edges,
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

export const PoemLibraryQuery = gql`
  query PoemLibrary(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    poemList: poemLibrary(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "poemLibrary", filter: ["search"]) {
      edges {
        node {
          id
          title
          teaser
          lines
          inLibrary
          author {
            id
            name
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

export const PoemRecentsQuery = gql`
  query PoemRecents(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    poemList: poemRecents(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "poemRecents", filter: ["search"]) {
      edges {
        node {
          id
          title
          teaser
          lines
          inLibrary
          author {
            id
            name
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

export default PoemListWithData;
