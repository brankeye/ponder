import React from 'react';
import { AsyncStorage } from 'react-native';
import { compose, withProps } from 'recompose';
import { withSearch, withAuthorLibraryQuery } from '@@graphql';
import { Screen, AuthorList, Loading } from '@@components';

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
    if (loading)
      return (
        <Screen>
          <Loading />
        </Screen>
      );
    return (
      <Screen>
        <AuthorList
          type={'Recents'}
          authors={authorList.edges.map(({ node }) => node)}
          onSelect={this.handleSelect}
          onEndReached={() =>
            authorList.pageInfo.hasNextPage &&
            fetchMore({
              first: count,
              after: authorList.pageInfo.endCursor,
              search,
            })
          }
        />
      </Screen>
    );
  }
}

export default enhance(LibraryAuthors);
