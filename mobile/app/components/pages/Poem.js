import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import PoemSection from '../PoemSection';
import PubSub from 'pubsub-js';
import pageComposer from '../composers/pageComposer';

@observer
class Poem extends Component {
  handlePress = () => {
    this.props.styles.toggleTheme();
    PubSub.publish('updateNavBar');
  }

  render() {
    return(
      <View style={this.props.styles.appStyle.containerStyle}>
        <Button title='Change color' onPress={this.handlePress}></Button>
        <PoemSection style={this.props.styles.appStyle.poemSectionStyle} />
      </View>
    )
  }
}

export default pageComposer(Poem);
