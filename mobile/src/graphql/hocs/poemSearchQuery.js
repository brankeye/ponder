import { graphql } from 'react-apollo';
import query from '../queries/poemSearch';

export default graphql(query, {
  alias: 'withPoemSearchQuery',
  name: 'poemSearchQuery',
  options: ({ count, search }) => ({
    variables: {
      first: count,
      search: search === '' ? undefined : search,
    },
    partialRefetch: true,
  }),
  props: props => {
    return {
      ...props,
      fetchMore: variables => {
        const { fetchMore } = props.poemSearchQuery;
        fetchMore({
          query,
          variables,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (
              previousResult.poemList.pageInfo.endCursor ===
              fetchMoreResult.poemList.pageInfo.endCursor
            ) {
              return previousResult;
            }
            const newEdges = fetchMoreResult.poemList.edges;
            const pageInfo = fetchMoreResult.poemList.pageInfo;
            return {
              poemList: {
                __typename: previousResult.poemList.__typename,
                edges: [...previousResult.poemList.edges, ...newEdges],
                pageInfo,
              },
            };
          },
        });
      },
    };
  },
});
