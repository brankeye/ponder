import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import pageComposer from '../composers/pageComposer';
import styles from '../../styles';
import tabsComposer from '../composers/tabsComposer';
import PoemsList from '../PoemsList';

@observer
class Library extends Component {
  getPoemsView = () => <PoemsList {...this.props} />;

  getAuthorsView = () => <View style={styles.container} />;

  render() {
    const LibraryPage = tabsComposer(this.getPoemsView, this.getAuthorsView);
    return <LibraryPage {...this.props} />;
  }
}

export default pageComposer(Library);
