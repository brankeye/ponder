import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import composePage from 'components/pages/composePage';
import { PoemSection } from 'components/presenters';
import hoistStatics from 'hoist-non-react-statics';

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
    props.navigation.setRootNavigator(this.props.navigator);
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
      <View>
        <PoemSection poem={this.props.poems.getSelectedPoem()} />
      </View>
    );
  }
}

const page = inject('poems')(composePage(observer(PoemPage)));
hoistStatics(page, PoemPage);
export default page;
