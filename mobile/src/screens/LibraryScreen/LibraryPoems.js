import React from 'react';
import { AsyncStorage } from 'react-native';
import { compose, withProps } from 'recompose';
import { withSearch, withPoemLibraryQuery } from '@@graphql';
import { Screen, PoemList, Loading } from '@@components';

const enhance = compose(
  withSearch('LibraryHeader/onSearch'),
  withProps({
    count: 5,
  }),
  withPoemLibraryQuery
);

class LibraryPoems extends React.Component {
  handleSelect = ({ id }) => this.props.navigation.navigate('Poem', { id });

  render() {
    const { count, search, fetchMore } = this.props;
    const { loading, poemList } = this.props.poemLibraryQuery;
    if (loading)
      return (
        <Screen>
          <Loading />
        </Screen>
      );
    return (
      <Screen>
        <PoemList
          type={'Library'}
          poems={poemList.edges.map(({ node }) => node)}
          onSelect={this.handleSelect}
          onEndReached={() =>
            poemList.pageInfo.hasNextPage &&
            fetchMore({
              first: count,
              after: poemList.pageInfo.endCursor,
              search,
            })
          }
        />
      </Screen>
    );
  }
}

export default enhance(LibraryPoems);
