import React from 'react';
import {
  Screen,
  PoemView,
  AuthorViewWithData,
  PoemLibraryQuery,
  PoemLibraryMutation,
  Subscriber,
  Loading,
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
  handleSelect = ({ id }) => this.props.navigation.navigate('Poem', { id });

  render() {
    const { updateLibrary } = this.props;
    const { loading, poem, refetch } = this.props.poemDiscoverQuery;
    if (loading)
      return (
        <Screen>
          <Loading />
        </Screen>
      );
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
