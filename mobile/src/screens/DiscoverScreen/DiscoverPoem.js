import React from 'react';
import {
  Screen,
  LoadingScreen,
  PoemView,
  PoemLibraryQuery,
  PoemLibraryMutation,
  Subscriber,
} from '@@components';
import { compose } from 'recompose';
import {
  withSearch,
  withPoemDiscoverQuery,
  withPoemLibraryMutation,
} from '@@graphql';

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
          onChangeLibrary={updateLibrary}
          fetching={loading}
          onFetchMore={refetch}
        />
      </Screen>
    );
  }
}

export default enhance(DiscoverPoem);
