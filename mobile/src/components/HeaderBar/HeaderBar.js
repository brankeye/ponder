import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import PubSub from 'pubsub-js';
import { withSettings, withTheme } from '@@utils/providers';
import { compose } from 'recompose';

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    elevation: 4,
  },
});

const enhance = compose(
  withTheme,
  withSettings
);

class HeaderBar extends React.Component {
  static defaultProps = {
    searchable: false,
  };

  state = {
    searching: false,
    searchTerm: '',
  };

  searchbar = React.createRef();

  componentDidUpdate(_, lastState) {
    if (lastState.searching && !this.state.searching) {
      this.handleChangeText(null, this.handleSearch);
    } else if (!lastState.searching && this.state.searching) {
      this.searchbar.current.focus();
    }
  }

  handleChangeText = (text, cb) => this.setState({ searchTerm: text }, cb);

  handleSearch = () => {
    PubSub.publish(`${this.props.name}/onSearch`, this.state.searchTerm);
  };

  toggleTheme = () => this.props.toggleTheme();

  toggleSearch = () =>
    this.setState(({ searching }) => ({
      searching: !searching,
    }));

  render() {
    const { title, searchable, theme } = this.props;
    const { searching, searchTerm } = this.state;

    if (searching) {
      return (
        <Searchbar
          ref={this.searchbar}
          placeholder={'Search'}
          onChangeText={this.handleChangeText}
          value={searchTerm}
          icon={'arrow-back'}
          onIconPress={this.toggleSearch}
          style={styles.bar}
          onBlur={this.handleSearch}
          selectionColor={theme.accentColor}
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

export default enhance(HeaderBar);
