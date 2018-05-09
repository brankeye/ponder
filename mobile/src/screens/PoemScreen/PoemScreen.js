import React, { Component } from 'react';
import { Screen, PoemView } from '@@components';

class PoemScreen extends Component {
  render() {
    const poem = this.props.navigation.getParam('poem', null);
    return (
      <Screen>
        <PoemView poem={poem} onLibraryChange={() => {}} />
      </Screen>
    );
  }
}

export default PoemScreen;
