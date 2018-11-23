import React from 'react';
import { AsyncStorage } from 'react-native';
import { compose, withProps } from 'recompose';
import { withSearch, withPoemRecentsQuery } from '@@graphql';
import { Screen, Loading, PoemList, PoemCard } from '@@components';

const enhance = compose(
  withSearch('RecentsHeader/onSearch'),
  withProps({
    count: 5,
  }),
  withPoemRecentsQuery
);

class RecentPoems extends React.Component {
  handleSelect = ({ id }) => this.props.navigation.navigate('Poem', { id });

  render() {
    const { count, search, fetchMore } = this.props;
    const { loading, poemList } = this.props.poemRecentsQuery;
    if (loading)
      return (
        <Screen>
          <Loading />
        </Screen>
      );
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
              showViewedAt={true}
            />
          )}
        </PoemList>
      </Screen>
    );
  }
}

export default enhance(RecentPoems);
