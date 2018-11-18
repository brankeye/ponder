import { graphql } from 'react-apollo';
import query from '../queries/authorRecents';

export default graphql(query, {
  alias: 'withAuthorRecentsQuery',
  name: 'authorRecentsQuery',
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
        const { authorList, fetchMore } = props.authorRecentsQuery;
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
