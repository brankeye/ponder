import React from 'react';
import { compose, withProps } from 'recompose';
import { withAuthorRecentsQuery } from '@@graphql';
import { withSearch } from '@@utils/hocs';
import {
  Screen,
  LoadingScreen,
  AuthorList,
  RecentAuthorCard,
} from '@@components';

const enhance = compose(
  withSearch('RecentsHeader/onSearch'),
  withProps({
    count: 5,
  }),
  withAuthorRecentsQuery
);

class RecentAuthors extends React.Component {
  handleSelect = ({ id }) => this.props.navigation.navigate('Author', { id });

  render() {
    const { count, search, fetchMore } = this.props;
    const { loading, authorList } = this.props.authorRecentsQuery;

    if (loading) return <LoadingScreen />;

    return (
      <Screen>
        <AuthorList
          authors={authorList.edges.map(({ node }) => node)}
          onEndReached={() =>
            authorList.pageInfo.hasNextPage &&
            fetchMore({
              first: count,
              after: authorList.pageInfo.endCursor,
              search,
            })
          }
        >
          {author => (
            <RecentAuthorCard
              author={author}
              underlayColor={'rgba(220, 220, 220, 0.4)'}
              onPress={this.handleSelect}
            />
          )}
        </AuthorList>
      </Screen>
    );
  }
}

export default enhance(RecentAuthors);
