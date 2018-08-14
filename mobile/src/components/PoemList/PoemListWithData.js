import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PoemList from './PoemList';

class PoemListWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { type, count, search, ...props } = this.props;
    return (
      <Query
        query={PoemListQuery}
        variables={{ from: type, first: count, search }}
      >
        {({
          loading,
          error,
          data: {
            poemList: { edges, pageInfo: { endCursor, hasNextPage } = {} } = {},
          },
          fetchMore,
        }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <PoemList
              {...props}
              poems={edges.map(({ node }) => ({ ...node }))}
              onEndReached={() => {
                hasNextPage &&
                  fetchMore({
                    query: PoemListQuery,
                    variables: {
                      from: type,
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

export const PoemListQuery = gql`
  query PoemList(
    $from: PoemCategory!
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    poemList(
      from: $from
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "poemList", filter: ["from", "search"]) {
      edges {
        node {
          id
          title
          teaser
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
