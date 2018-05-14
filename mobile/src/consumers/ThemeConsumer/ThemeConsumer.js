import React from 'react';
import { lightTheme, darkTheme } from '@@constants';

const { Provider, Consumer } = React.createContext();

class ThemeProvider extends React.Component {
  static defaultProps = {
    theme: darkTheme,
  };

  state = { theme: this.props.theme };

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
