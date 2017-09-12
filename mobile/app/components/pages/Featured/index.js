import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { PAGE_POEM } from 'constants/screens';
import composePage from 'components/pages/composePage';

class Featured extends Component {
  constructor(props) {
    super(props);
    props.navigation.setRootNavigator(this.props.navigator);
  }

  handlePress = () => {
    this.props.theme.toggleTheme();
  };

  render() {
    return (
      <View>
        <Text>Featured Page</Text>
      </View>
    );
  }
}

const page = inject('poems', 'navigation')(observer(Featured));
export default composePage(page);
