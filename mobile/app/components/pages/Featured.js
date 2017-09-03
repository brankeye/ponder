import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../../firebase';
import { inject, observer } from 'mobx-react';
import { PAGE_POEM } from '../../screens/screenNames';
import pageComposer from '../composers/pageComposer';
import PoemSection from '../PoemSection';

@inject('poems', 'navigation')
@observer
class Featured extends Component {
  constructor(props) {
    super(props);
    props.navigation.setRootNavigator(this.props.navigator);
  }

  handlePress = () => {
    this.props.styles.toggleTheme();
  }

  render() {
    const { containerStyle, textStyle } = this.props.appStyle;
    return(
      <View style={containerStyle}>
        <Button title='Change color' onPress={this.handlePress}></Button>
        <PoemSection poem={this.props.poems.poem} style={containerStyle} textStyle={textStyle} />
      </View>
    )
  }
}

export default pageComposer(Featured);
