import React from 'react';
import {
  Screen,
  AuthorView,
  AuthorViewWithData,
  PoemLibraryQuery,
  PoemLibraryMutation,
  Subscriber,
  Loading,
} from '@@components';
import { compose } from 'recompose';
import { withAuthorDiscoverQuery } from '@@graphql';

const enhance = compose(withAuthorDiscoverQuery);

class DiscoverAuthor extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', true);

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Author', { id });
  };

  handleSearch = term => {
    if (this.isActive()) {
      this.setState({ searchTerm: term });
    }
  };

  render() {
    const { loading, author, refetch } = this.props.authorDiscoverQuery;
    if (loading)
      return (
        <Screen>
          <Loading />
        </Screen>
      );
    return (
      <React.Fragment>
        <Subscriber topic={'HomeHeader/onSearch'} handler={this.handleSearch} />
        <Screen>
          <AuthorView
            author={author}
            fetching={loading}
            onFetchMore={refetch}
          />
        </Screen>
      </React.Fragment>
    );
  }
}

export default enhance(DiscoverAuthor);
