import React, { Component } from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import styles from '../../styles';

const composer = (PoemsView, AuthorsView) => {
  class TabPage extends Component {
    state = {
      index: 0,
      routes: [{ key: '1', title: 'Poems' }, { key: '2', title: 'Authors' }]
    };

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => (
      <TabBar
        {...props}
        style={{ backgroundColor: 'rgba(0,0,0,0)' }}
        tabStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
        labelStyle={this.props.appStyle.textColor}
      />
    );

    _renderScene = SceneMap({
      '1': PoemsView,
      '2': AuthorsView
    });

    render() {
      const { pageBackgroundColor, textColor } = this.props.appStyle;
      const pageStyle = [pageBackgroundColor, styles.container];
      return (
        <TabViewAnimated
          style={[pageStyle, { marginLeft: 4 }]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
        />
      );
    }
  }

  return TabPage;
};

export default composer;
