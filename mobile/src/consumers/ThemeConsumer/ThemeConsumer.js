import React from 'react';
import { Query } from 'react-apollo';
import { themeQuery } from '@@graphql';
import { lightTheme, darkTheme } from '@@constants';

const { Provider, Consumer } = React.createContext();

class ThemeProvider extends React.Component {
  state = { theme: darkTheme };

  toggleTheme = () => {
    const { theme } = this.state;
    const nextTheme = theme.type === 'light' ? darkTheme : lightTheme;
    this.setState({ theme: nextTheme });
  };

  render() {
    return (
      <Provider
        value={{
          theme: this.state.theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const ThemeConsumer = Consumer;
export { ThemeProvider, ThemeConsumer };
