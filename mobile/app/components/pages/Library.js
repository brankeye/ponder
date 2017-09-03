import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import pageComposer from '../composers/pageComposer';
import styles from '../../styles';
import tabsComposer from '../composers/tabsComposer';

const PoemsView = () => <View style={styles.container} />;
const AuthorsView = () => <View style={styles.container} />;

@observer
class Library extends Component {
  render() {
    const LibraryPage = tabsComposer(PoemsView, AuthorsView);
    return <LibraryPage {...this.props} />;
  }
}

export default pageComposer(Library);
