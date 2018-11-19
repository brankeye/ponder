import React, { Component } from 'react';
import { compose, mapProps } from 'recompose';
import { Screen, AuthorView } from '@@components';
import { withAuthorQuery } from '@@graphql';

const enhance = (mapProps(props => ({
  ...props,
  id: props.navigation.getParam('id', null),
})),
withAuthorQuery);

class AuthorScreen extends Component {
  handleSelectPoem = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
  };

  render() {
    const { poem } = this.props.poemQuery;
    return (
      <Screen>
        <AuthorView author={author} onSelectPoem={this.handleSelectPoem} />
      </Screen>
    );
  }
}

export default enhance(AuthorScreen);
