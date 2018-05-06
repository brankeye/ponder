import React, { Component } from 'react';
import { View, Text } from '@@components/presenters';
import { PoemView } from '@@components/containers';

class PoemScreen extends Component {
  render() {
    const { poem } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PoemView poem={poem} onLibraryChange={() => {}} />
      </View>
    );
  }
}

export default PoemScreen;
