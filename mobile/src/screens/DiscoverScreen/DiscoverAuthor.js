import React from 'react';
import {
  Screen,
  LoadingScreen,
  AuthorView,
  AuthorList,
  AuthorCard,
} from '@@components';
import { compose, withProps } from 'recompose';
import { withAuthorDiscoverQuery, withAuthorSearchQuery } from '@@graphql';
import { withSearch } from '@@utils/hocs';

const enhance = compose(
  withSearch('DiscoverHeader/onSearch'),
  withProps({
    count: 5,
  }),
  withAuthorDiscoverQuery,
  withAuthorSearchQuery
);

class DiscoverAuthor extends React.Component {
  handleSelect = ({ id }) => this.props.navigation.navigate('Author', { id });

  render() {
    const { count, search, fetchMore } = this.props;
    const { loading, author, refetch } = this.props.authorDiscoverQuery;
    const {
      loading: loadingAuthors,
      authorList,
    } = this.props.authorSearchQuery;

    if (loading || loadingAuthors) return <LoadingScreen />;

    if (search) {
      return (
        <Screen>
          <AuthorList
            authors={authorList.edges.map(({ node }) => node)}
            onEndReached={() =>
              authorList.pageInfo.hasNextPage &&
              fetchMore({
                first: count,
                after: authorList.pageInfo.endCursor,
                search,
              })
            }
          >
            {author => (
              <AuthorCard
                author={author}
                underlayColor={'rgba(220, 220, 220, 0.4)'}
                onPress={this.handleSelect}
              />
            )}
          </AuthorList>
        </Screen>
      );
    }

    return (
      <Screen>
        <AuthorView author={author} fetching={loading} onFetchMore={refetch} />
      </Screen>
    );
  }
}

export default enhance(DiscoverAuthor);
