import React from 'react';
import {
  Screen,
  AuthorView,
  AuthorViewWithData,
  PoemLibraryQuery,
  PoemLibraryMutation,
  Subscriber,
  Loading,
} from '@@components';
import { compose } from 'recompose';
import { withSearch, withAuthorDiscoverQuery } from '@@graphql';

const enhance = compose(
  withSearch('DiscoverHeader/onSearch'),
  withAuthorDiscoverQuery
);

class DiscoverAuthor extends React.Component {
  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Author', { id });
  };

  render() {
    const { loading, author, refetch } = this.props.authorDiscoverQuery;
    if (loading)
      return (
        <Screen>
          <Loading />
        </Screen>
      );
    return (
      <Screen>
        <AuthorView author={author} fetching={loading} onFetchMore={refetch} />
      </Screen>
    );
  }
}

export default enhance(DiscoverAuthor);
