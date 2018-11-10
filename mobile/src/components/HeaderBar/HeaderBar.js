import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import PubSub from 'pubsub-js';
import { withTheme } from '@@consumers';

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    elevation: 4,
  },
});

class HeaderBar extends React.Component {
  static defaultProps = {
    searchable: false,
  };

  state = {
    searching: false,
    searchTerm: '',
  };

  handleChangeText = text => this.setState({ searchTerm: text });

  handleSearch = () => {
    PubSub.publish(`${this.props.name}/onSearch`, this.state.searchTerm);
  };

  toggleTheme = () => this.props.toggleTheme();

  toggleSearch = () =>
    this.setState(({ searching }) => ({
      searching: !searching,
    }));

  render() {
    const { title, searchable, themeable, ...props } = this.props;
    const { searching, searchTerm } = this.state;

    if (searching) {
      return (
        <Searchbar
          placeholder={'Search'}
          onChangeText={this.handleChangeText}
          value={searchTerm}
          icon={'arrow-back'}
          onIconPress={this.toggleSearch}
          style={styles.bar}
        />
      );
    }

    return (
      <Appbar style={styles.bar}>
        <Appbar.Content title={title} />
        <Appbar.Action icon="palette" onPress={this.toggleTheme} />
        {searchable && (
          <Appbar.Action icon="search" onPress={this.toggleSearch} />
        )}
      </Appbar>
    );
  }
}

export default withTheme(HeaderBar);
