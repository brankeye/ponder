import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import composePage from 'components/pages/composePage';
import { PoemSection } from 'components/presenters';
import hoistStatics from 'hoist-non-react-statics';
import pages from 'constants/screens';
import styles from './styles';

class PoemPage extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Theme',
        id: 'theme'
      }
    ]
  };

  constructor(props) {
    super(props);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    this.props.onNavigatorEvent(event);
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'theme') {
        this.props.theme.toggleTheme();
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <PoemSection poem={this.props.poems.selectedPoem} />
      </View>
    );
  }
}

const page = inject('poems')(composePage(PoemPage));
hoistStatics(page, PoemPage);
export default page;