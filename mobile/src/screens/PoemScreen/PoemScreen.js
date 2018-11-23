import React, { Component } from 'react';
import { compose, mapProps } from 'recompose';
import { Screen, Loading, PoemView } from '@@components';
import { withPoemQuery } from '@@graphql';

const enhance = compose(
  mapProps(props => ({
    ...props,
    id: props.navigation.getParam('id', null),
  })),
  withPoemQuery
);

class PoemScreen extends Component {
  render() {
    const { loading, poem } = this.props.poemQuery;
    if (loading)
      return (
        <Screen>
          <Loading />
        </Screen>
      );
    return (
      <Screen>
        <PoemView poem={poem} onChangeLibrary={() => {}} />
      </Screen>
    );
  }
}

export default enhance(PoemScreen);
