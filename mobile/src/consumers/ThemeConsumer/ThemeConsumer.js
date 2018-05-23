import React from 'react';
import { lightTheme, darkTheme } from '@@constants';
import Color from 'color';
import { ThemeProvider as MaterialThemeProvider } from 'react-native-material-ui';

const { Provider, Consumer } = React.createContext();

class ThemeProvider extends React.Component {
  static defaultProps = {
    type: 'dark',
    onThemeToggled: () => {},
  };

  state = { theme: this.props.type === 'light' ? lightTheme : darkTheme };

  toggleTheme = () => {
    const { theme } = this.state;
    const nextTheme = theme.type === 'light' ? darkTheme : lightTheme;
    this.setState({ theme: nextTheme });
    this.props.onThemeToggled(nextTheme.type);
  };

  render() {
    return (
      <Provider
        value={{
          theme: this.state.theme,
          toggleTheme: this.toggleTheme,
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
