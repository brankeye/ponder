import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { poemListQuery } from '@@graphql';
import PoemList from './PoemList';

class PoemListWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { type, count, search, ...props } = this.props;
    return (
      <Query
        query={poemListQuery}
        variables={{ from: type, first: count, search }}
      >
        {({
          loading,
          error,
          data: { poemList: { edges, pageInfo: { endCursor } = {} } = {} },
          fetchMore,
        }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <PoemList
              {...props}
              poems={edges.map(({ node }) => ({ ...node }))}
              onFetchMore={() => {
                fetchMore({
                  query: poemListQuery,
                  variables: {
                    from: type,
                    first: count,
                    after: endCursor,
                    search,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.poemList.edges;
                    const pageInfo = fetchMoreResult.poemList.pageInfo;
                    return newEdges.length
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

export default PoemListWithData;
