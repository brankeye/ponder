import React, { Component } from 'react';
import { compose, mapProps } from 'recompose';
import { Screen, LoadingScreen, AuthorView } from '@@components';
import { withAuthorQuery } from '@@graphql';

const enhance = compose(
  mapProps(props => ({
    ...props,
    id: props.navigation.getParam('id', null),
  })),
  withAuthorQuery
);

class AuthorScreen extends Component {
  handleSelectPoem = ({ id }) => this.props.navigation.navigate('Poem', { id });

  render() {
    const { loading, author } = this.props.authorQuery;

    if (loading) return <LoadingScreen />;

    return (
      <Screen>
        <AuthorView author={author} onSelectPoem={this.handleSelectPoem} />
      </Screen>
    );
  }
}

export default enhance(AuthorScreen);
