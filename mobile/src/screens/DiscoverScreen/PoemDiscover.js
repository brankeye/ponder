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
import { withPoemDiscoverQuery, withPoemLibraryMutation } from '@@graphql';

const enhance = compose(
  withPoemLibraryMutation,
  withPoemDiscoverQuery
);

class PoemDiscover extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', true);

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
  };

  handleSearch = term => {
    if (this.isActive()) {
      this.setState({ searchTerm: term });
    }
  };

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
      <React.Fragment>
        <Subscriber topic={'HomeHeader/onSearch'} handler={this.handleSearch} />
        <Screen>
          <PoemView
            poem={poem}
            onChangeLibrary={updateLibrary}
            fetching={loading}
            onFetchMore={refetch}
          />
        </Screen>
      </React.Fragment>
    );
  }
}

export default enhance(PoemDiscover);
