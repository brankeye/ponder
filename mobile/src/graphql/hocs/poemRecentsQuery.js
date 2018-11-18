import { graphql } from 'react-apollo';
import query from '../queries/poemRecents';

export default graphql(query, {
  alias: 'withPoemRecentsQuery',
  name: 'poemRecentsQuery',
  options: ({ count, search }) => ({
    variables: {
      first: count,
      search,
    },
    partialRefetch: true,
  }),
  props: props => {
    return {
      ...props,
      fetchMore: variables => {
        const { fetchMore } = props.poemRecentsQuery;
        fetchMore({
          query,
          variables,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.poemList.edges;
            const pageInfo = fetchMoreResult.poemList.pageInfo;
            return newEdges.length
              ? {
                  poemList: {
                    __typename: previousResult.poemList.__typename,
                    edges: [...previousResult.poemList.edges, ...newEdges],
                    pageInfo,
                  },
                }
              : previousResult;
          },
        });
      },
    };
  },
});
