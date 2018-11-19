import React, { Component } from 'react';
import { compose, mapProps } from 'recompose';
import { Screen, PoemViewWithData, PoemListQuery } from '@@components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const enhance = compose(
  mapProps(props => ({
    ...props,
    id: props.navigation.getParam('id', null),
  }))
);

class PoemScreen extends Component {
  render() {
    const { id } = this.props;
    return (
      <Screen>
        <PoemViewWithData id={id} onChangeLibrary={() => {}} />
      </Screen>
    );
  }
}

export default enhance(PoemScreen);
