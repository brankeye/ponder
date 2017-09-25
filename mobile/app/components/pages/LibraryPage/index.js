import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import composePage from 'components/pages/composePage';
import { PoemList } from 'components/presenters';
import pages from 'constants/screens';

class LibraryPage extends Component {
  handleSelectPoem = id => {
    this.props.poems.selectPoem(id);
    this.props.navigator.push({ screen: pages.PoemPage });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PoemList
          poems={this.props.poems.poemArray}
          onSelectPoem={this.handleSelectPoem}
        />
      </View>
    );
  }
}

const page = inject('poems')(composePage(observer(LibraryPage)));
export default page;
