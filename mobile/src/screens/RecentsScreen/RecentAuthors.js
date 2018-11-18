import React from 'react';
import { AsyncStorage } from 'react-native';
import { compose, withProps } from 'recompose';
import { withSearch, withAuthorRecentsQuery } from '@@graphql';
import { Screen, AuthorList, Loading } from '@@components';

const enhance = compose(
  withSearch('RecentsHeader/onSearch'),
  withProps({
    count: 5,
  }),
  withAuthorRecentsQuery
);

class RecentAuthors extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', false);

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Author', { id });
  };

  handleSearch = term => {
    if (this.isActive()) {
      this.setState({ search: term });
    }
  };

  render() {
    const { count, search, fetchMore } = this.props;
    const { loading, authorList } = this.props.authorRecentsQuery;
    if (loading)
      return (
        <Screen>
          <Loading />
        </Screen>
      );
    return (
      <Screen>
        <AuthorList
          type={'Recents'}
          authors={authorList.edges.map(({ node }) => node)}
          onSelect={this.handleSelect}
          onEndReached={() =>
            fetchMore({
              first: count,
              after: authorList.pageInfo.endCursor,
              search,
            })
          }
        />
      </Screen>
    );
  }
}

export default enhance(RecentAuthors);
