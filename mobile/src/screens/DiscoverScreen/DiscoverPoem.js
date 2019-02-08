import React from 'react';
import {
  Screen,
  LoadingScreen,
  PoemView,
  PoemList,
  PoemCard,
} from '@@components';
import { compose, withProps } from 'recompose';
import { withPoemDiscoverQuery, withPoemSearchQuery } from '@@graphql';
import { withSearch } from '@@utils/hocs';

const enhance = compose(
  withSearch('DiscoverHeader/onSearch'),
  withProps({
    count: 5,
  }),
  withPoemDiscoverQuery,
  withPoemSearchQuery
);

class DiscoverPoem extends React.Component {
  handleSelect = ({ id }) => this.props.navigation.navigate('Poem', { id });

  render() {
    const { count, search, fetchMore, updateLibrary } = this.props;
    const { loading, poem, refetch } = this.props.poemDiscoverQuery;
    const { loading: loadingPoems, poemList } = this.props.poemSearchQuery;

    if (loading || loadingPoems) return <LoadingScreen />;

    if (search) {
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
