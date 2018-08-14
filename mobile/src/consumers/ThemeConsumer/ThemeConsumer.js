import React from 'react';
import { lightTheme, darkTheme } from '@@constants';
import Color from 'color';
import { ThemeProvider as MaterialThemeProvider } from 'react-native-material-ui';

const { Provider, Consumer } = React.createContext();

class ThemeProvider extends React.Component {
  static defaultProps = {
    type: 'Dark',
  };

  state = {
    theme: this.props.type === 'Dark' ? darkTheme : lightTheme,
  };

  componentDidUpdate(lastProps) {
    if (lastProps.type !== this.props.type) {
      this.setState({
        theme: this.props.type === 'Dark' ? darkTheme : lightTheme,
      });
    }
  }

  render() {
    return (
      <Provider
        value={{
          theme: this.state.theme,
        }}
      >
        <MaterialThemeProvider
          uiTheme={{
            palette: {
              primaryColor: this.state.theme.backgroundColor,
              primaryTextColor: Color(this.state.theme.textColor)
                .alpha(0.87)
                .toString(),
              secondaryTextColor: Color(this.state.theme.textColor)
                .alpha(0.54)
                .toString(),
              activeIcon: Color(this.state.theme.primaryColor)
                .alpha(0.87)
                .toString(),
              inactiveIcon: Color(this.state.theme.primaryColor)
                .alpha(0.54)
                .toString(),
              canvasColor: this.state.theme.backgroundColor,
            },
            toolbar: {
              container: {
                height: 50,
              },
              titleText: {
                color: this.state.theme.textColor,
              },
              rightElement: {
                color: this.state.theme.textColor,
              },
              leftElement: {
                color: this.state.theme.textColor,
              },
            },
            toolbarSearchActive: {
              rightElement: {
                color: this.state.theme.textColor,
              },
              leftElement: {
                color: this.state.theme.textColor,
              },
            },
          }}
        >
          {this.props.children}
        </MaterialThemeProvider>
      </Provider>
    );
  }
}

const ThemeConsumer = Consumer;
export { ThemeProvider, ThemeConsumer };
