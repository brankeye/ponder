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
        const { authorList, fetchMore } = props.authorLibraryQuery;
        variables.hasNextPage &&
          fetchMore({
            query,
            variables,
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.authorList.edges;
              const pageInfo = fetchMoreResult.authorList.pageInfo;
              return newEdges.length
                ? {
                    authorList: {
                      __typename: previousResult.authorList.__typename,
                      edges: [...previousResult.authorList.edges, ...newEdges],
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
