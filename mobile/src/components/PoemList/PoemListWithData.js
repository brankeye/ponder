import React, { Component } from 'react';
import { Loading } from '@@components';
import { Query } from 'react-apollo';
import { poemRecentsQuery, poemLibraryQuery } from '@@graphql';
import PoemList from './PoemList';

class PoemListWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { type, count, search, ...props } = this.props;
    const query = type === 'Library' ? poemLibraryQuery : poemRecentsQuery;
    return (
      <Query query={query} variables={{ first: count, search }}>
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
              type={type}
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
                      return {
                        poemList: {
                          __typename: previousResult.poemList.__typename,
                          edges: [
                            ...previousResult.poemList.edges,
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

export default PoemListWithData;
