import React, { Component } from 'react';
import { View, Text } from 'components/presenters';

class LandingPage extends Component {
  componentDidMount() {
    //await this.props.poems.fetchPoems();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>LandingPage!</Text>
      </View>
    );
  }
}

export default LandingPage;
