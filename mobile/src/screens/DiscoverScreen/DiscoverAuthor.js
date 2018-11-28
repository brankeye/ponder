import React from 'react';
import { Screen, LoadingScreen, AuthorView } from '@@components';
import { compose } from 'recompose';
import { withAuthorDiscoverQuery } from '@@graphql';
import { withSearch } from '@@utils/hocs';

const enhance = compose(
  withSearch('DiscoverHeader/onSearch'),
  withAuthorDiscoverQuery
);

class DiscoverAuthor extends React.Component {
  render() {
    const { loading, author, refetch } = this.props.authorDiscoverQuery;

    if (loading) return <LoadingScreen />;

    return (
      <Screen>
        <AuthorView author={author} fetching={loading} onFetchMore={refetch} />
      </Screen>
    );
  }
}

export default enhance(DiscoverAuthor);
