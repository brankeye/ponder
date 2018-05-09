import React, { Component } from 'react';
import { Screen, AuthorView } from '@@components';

class AuthorScreen extends Component {
  handleSelectPoem = poem => {
    this.props.navigation.navigate('Poem', { poem });
  };

  render() {
    const author = this.props.navigation.getParam('author', null);
    return (
      <Screen>
        <AuthorView author={author} onSelectPoem={this.handleSelectPoem} />
      </Screen>
    );
  }
}

export default AuthorScreen;
