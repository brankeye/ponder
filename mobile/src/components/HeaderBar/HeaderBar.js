import React from 'react';
import { Toolbar, IconToggle } from 'react-native-material-ui';
import PubSub from 'pubsub-js';
import { ThemeConsumer } from '@@consumers';

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
      themeable,
      onLeftElementPress,
      ...props
    } = this.props;

    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <Toolbar
            {...props}
            leftElement={
              <IconToggle
                name={'menu'}
                color={theme.textColor}
                onPress={() => {
                  navigation.toggleDrawer();
                  if (onLeftElementPress) onLeftElementPress();
                }}
              />
            }
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
            rightElement={
              themeable && (
                <IconToggle
                  name={'palette'}
                  color={theme.textColor}
                  onPress={() => {
                    if (themeable) {
                      toggleTheme();
                    }
                  }}
                />
              )
            }
          />
        )}
      </ThemeConsumer>
    );
  }
}

export default HeaderBar;
