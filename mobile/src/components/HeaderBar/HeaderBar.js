import React from 'react';
import { Toolbar } from 'react-native-material-ui';
import PubSub from 'pubsub-js';

class HeaderBar extends React.Component {
  static defaultProps = {
    searchable: false,
  };

  state = {};

  handleChangeText = text => this.setState({ searchTerm: text });

  handleSearch = () => {
    PubSub.publish(`${this.props.name}/onSearch`, this.state.searchTerm);
  };

  render() {
    const {
      navigation,
      title,
      searchable,
      onLeftElementPress,
      ...props
    } = this.props;

    return (
      <Toolbar
        {...props}
        leftElement="menu"
        centerElement={title}
        searchable={
          searchable
            ? {
                autoFocus: true,
                placeholder: 'Search',
                onChangeText: this.handleChangeText,
                onSubmitEditing: this.handleSearch,
              }
            : undefined
        }
        onLeftElementPress={() => {
          navigation.toggleDrawer();
          if (onLeftElementPress) onLeftElementPress();
        }}
      />
    );
  }
}

export default HeaderBar;
