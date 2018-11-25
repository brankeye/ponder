import React, { Component } from 'react';
import { compose, mapProps } from 'recompose';
import { Screen, LoadingScreen, PoemView } from '@@components';
import { withPoemQuery, withPoemLibraryMutation } from '@@graphql';

const enhance = compose(
  withPoemLibraryMutation,
  mapProps(props => ({
    ...props,
    id: props.navigation.getParam('id', null),
  })),
  withPoemQuery
);

class PoemScreen extends Component {
  render() {
    const { updateLibrary } = this.props;
    const { loading, poem } = this.props.poemQuery;

    if (loading) return <LoadingScreen />;

    return (
      <Screen>
        <PoemView poem={poem} onUpdateLibrary={updateLibrary} />
      </Screen>
    );
  }
}

export default enhance(PoemScreen);
