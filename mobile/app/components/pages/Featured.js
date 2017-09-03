import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../../firebase';
import { inject, observer } from 'mobx-react';
import { PAGE_POEM } from '../../screens/screenNames';
import pageComposer from '../composers/pageComposer';
import PoemSection from '../PoemSection';
import styles from '../../styles';

@inject('poems', 'navigation')
@observer
class Featured extends Component {
  constructor(props) {
    super(props);
    props.navigation.setRootNavigator(this.props.navigator);
  }

  handlePress = () => {
    this.props.theme.toggleTheme();
  }

  render() {
    const { pageBackgroundColor, textColor } = this.props.appStyle;
    const pageStyle = [pageBackgroundColor, styles.container];
    return(
      <View style={pageStyle}>
        <Button title='Change color' onPress={this.handlePress}></Button>
        <PoemSection poem={this.props.poems.poem} style={styles.container} textStyle={textColor} />
      </View>
    )
  }
}

export default pageComposer(Featured);
