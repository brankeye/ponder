import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import themeComposer from '../../themes/composer';

@inject('storeA', 'storeB')
@observer
class Sample extends Component {
  componentDidMount() {
    const { theme } = this.props;
    console.log(JSON.stringify(theme));
  }

  render() {
    return(
      <View>
        <Text>
          {this.props.storeA.data}
        </Text>
        <Text>
          {this.props.storeB.data}
        </Text>
      </View>
    )
  }
}

export default themeComposer(Sample);
