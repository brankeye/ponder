import React from 'react';
import { compose, withProps } from 'recompose';
import { withSearch, withPoemLibraryQuery } from '@@graphql';
import { Screen, LoadingScreen, PoemList, PoemCard } from '@@components';

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

    if (loading) return <LoadingScreen />;

    return (
      <Screen>
        <PoemList
          poems={poemList.edges.map(({ node }) => node)}
          onEndReached={() =>
            poemList.pageInfo.hasNextPage &&
            fetchMore({
              first: count,
              after: poemList.pageInfo.endCursor,
              search,
            })
          }
        >
          {poem => (
            <PoemCard
              poem={poem}
              onPress={this.handleSelect}
              showViewedAt={false}
            />
          )}
        </PoemList>
      </Screen>
    );
  }
}

export default enhance(LibraryPoems);
