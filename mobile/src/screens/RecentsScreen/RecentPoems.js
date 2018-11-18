import React from 'react';
import { AsyncStorage } from 'react-native';
import { compose, withProps } from 'recompose';
import { withSearch, withPoemRecentsQuery } from '@@graphql';
import { Screen, PoemList, Loading } from '@@components';

const enhance = compose(
  withSearch('RecentsHeader/onSearch'),
  withProps({
    count: 5,
  }),
  withPoemRecentsQuery
);

class RecentPoems extends React.Component {
  state = {};

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
  };

  render() {
    const { count, search, fetchMore } = this.props;
    console.log({ count, search });
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
          type={'Recents'}
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

export default enhance(RecentPoems);
