import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import PoemSection from '../PoemSection';
import Page from './Page';
import PubSub from 'pubsub-js';

@inject('styles')
@observer
class Poem extends Component {
  state = {
    useLightTheme: false
  };

  handlePress = () => {
    const useLightTheme = !this.state.useLightTheme;
    this.setState({ useLightTheme });
    useLightTheme
      ? this.props.styles.applyDarkTheme()
      : this.props.styles.applyLightTheme();
    PubSub.publish('updateNavBar');
  }

  render() {
    return(
      <Page navigator={this.props.navigator} name='poem'>
        <View style={this.props.styles.current.containerStyle}>
          <Button title='Change color' onPress={this.handlePress}></Button>
          <PoemSection style={this.props.styles.current.poemSectionStyle} />
        </View>
      </Page>
    )
  }
}

export default Poem;
