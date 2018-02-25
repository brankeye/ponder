import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from 'components/presenters';
import { PoemView } from 'components/containers';

class PoemPage extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PoemView poem={this.props.poems.selectedPoem} />
      </View>
    );
  }
}

export default PoemPage;
