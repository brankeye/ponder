import { graphql } from 'react-apollo';
import query from '../queries/authorLibrary';

export default graphql(query, {
  alias: 'withAuthorLibraryQuery',
  name: 'authorLibraryQuery',
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
        const { fetchMore } = props.authorLibraryQuery;
        fetchMore({
          query,
          variables,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (
              previousResult.authorList.pageInfo.endCursor ===
              fetchMoreResult.authorList.pageInfo.endCursor
            ) {
              return previousResult;
            }
            const newEdges = fetchMoreResult.authorList.edges;
            const pageInfo = fetchMoreResult.authorList.pageInfo;
            return {
              authorList: {
                __typename: previousResult.authorList.__typename,
                edges: [...previousResult.authorList.edges, ...newEdges],
                pageInfo,
              },
            };
          },
        });
      },
    };
  },
});
