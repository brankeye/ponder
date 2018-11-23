import React from 'react';
import { compose, withProps } from 'recompose';
import { withSearch, withAuthorLibraryQuery } from '@@graphql';
import { Screen, LoadingScreen, AuthorList, AuthorCard } from '@@components';

const enhance = compose(
  withSearch('LibraryHeader/onSearch'),
  withProps({
    count: 5,
  }),
  withAuthorLibraryQuery
);

class LibraryAuthors extends React.Component {
  handleSelect = ({ id }) => this.props.navigation.navigate('Author', { id });

  render() {
    const { count, search, fetchMore } = this.props;
    const { loading, authorList } = this.props.authorLibraryQuery;

    if (loading) return <LoadingScreen />;

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
}

export default enhance(LibraryAuthors);
