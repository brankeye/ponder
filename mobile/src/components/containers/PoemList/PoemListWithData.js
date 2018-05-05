import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { poemListQuery, poemLibraryQuery } from '@@graphql';
import PoemList from './PoemList';

class PoemListWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { count, inLibrary, ...props } = this.props;
    const query = inLibrary ? poemLibraryQuery : poemListQuery;
    return (
      <Query query={query} variables={{ first: count }}>
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
                  variables: { first: count, after: endCursor },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    console.log({ endCursor, fetchMoreResult });
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
