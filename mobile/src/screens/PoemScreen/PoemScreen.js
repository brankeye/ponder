import React, { Component } from 'react';
import { compose, mapProps } from 'recompose';
import { Screen, PoemView } from '@@components';
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
    const { poem } = this.props.poemQuery;
    return (
      <Screen>
        <PoemView poem={poem} onChangeLibrary={() => {}} />
      </Screen>
    );
  }
}

export default enhance(PoemScreen);
