import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import PoemSection from '../PoemSection';

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
  }

  render() {
    return(
      <View style={this.props.styles.current.containerStyle}>
        <Button title='Change color' onPress={this.handlePress}></Button>
        <PoemSection style={this.props.styles.current.poemSectionStyle} />
      </View>
    )
  }
}

export default Poem;
