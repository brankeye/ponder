import React from 'react';
import { compose, withProps } from 'recompose';
import { withPoemRecentsQuery } from '@@graphql';
import { withSearch } from '@@utils/hocs';
import { Screen, LoadingScreen, PoemList, RecentPoemCard } from '@@components';

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
          {poem => <RecentPoemCard poem={poem} onPress={this.handleSelect} />}
        </PoemList>
      </Screen>
    );
  }
}

export default enhance(RecentPoems);
