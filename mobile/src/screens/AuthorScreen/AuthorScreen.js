import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Screen, AuthorViewWithData } from '@@components';

class AuthorScreen extends Component {
  handleSelectPoem = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
  };

  render() {
    const id = this.props.navigation.getParam('id', null);
    return (
      <Screen>
        <AuthorViewWithData id={id} onSelectPoem={this.handleSelectPoem} />
      </Screen>
    );
  }
}

export default AuthorScreen;
