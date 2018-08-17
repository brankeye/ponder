import React from 'react';
import { lightTheme, darkTheme } from '@@constants';
import Color from 'color';
import { ThemeProvider as MaterialThemeProvider } from 'react-native-material-ui';

const { Provider, Consumer } = React.createContext();

class ThemeProvider extends React.Component {
  static defaultProps = {
    type: 'Dark',
  };

  render() {
    const theme = this.props.type === 'Dark' ? darkTheme : lightTheme;
    return (
      <Provider
        value={{
          theme,
        }}
      >
        <MaterialThemeProvider
          uiTheme={{
            palette: {
              primaryColor: theme.backgroundColor,
              primaryTextColor: Color(theme.textColor)
                .alpha(0.87)
                .toString(),
              secondaryTextColor: Color(theme.textColor)
                .alpha(0.54)
                .toString(),
              activeIcon: Color(theme.primaryColor)
                .alpha(0.87)
                .toString(),
              inactiveIcon: Color(theme.primaryColor)
                .alpha(0.54)
                .toString(),
              canvasColor: theme.backgroundColor,
            },
            toolbar: {
              container: {
                height: 50,
              },
              titleText: {
                color: theme.textColor,
              },
              rightElement: {
                color: theme.textColor,
              },
              leftElement: {
                color: theme.textColor,
              },
            },
            toolbarSearchActive: {
              rightElement: {
                color: theme.textColor,
              },
              leftElement: {
                color: theme.textColor,
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
