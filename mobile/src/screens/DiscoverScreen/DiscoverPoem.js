import React from 'react';
import { Screen, LoadingScreen, PoemView } from '@@components';
import { compose } from 'recompose';
import { withPoemDiscoverQuery, withPoemLibraryMutation } from '@@graphql';
import { withSearch } from '@@utils/hocs';

const enhance = compose(
  withSearch('DiscoverHeader/onSearch'),
  withPoemLibraryMutation,
  withPoemDiscoverQuery
);

class DiscoverPoem extends React.Component {
  render() {
    const { updateLibrary } = this.props;
    const { loading, poem, refetch } = this.props.poemDiscoverQuery;

    if (loading) return <LoadingScreen />;

    return (
      <Screen>
        <PoemView
          poem={poem}
          onUpdateLibrary={updateLibrary}
          fetching={loading}
          onFetchMore={refetch}
        />
      </Screen>
    );
  }
}

export default enhance(DiscoverPoem);
