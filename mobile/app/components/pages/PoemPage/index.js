import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import composePage from 'components/pages/composePage';
import { PoemSection } from 'components/presenters';

class PoemPage extends Component {
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
        <PoemSection poem={this.props.poems.getSelectedPoem()} />
      </View>
    );
  }
}

const page = inject('poems')(observer(PoemPage));
export default composePage(page);
