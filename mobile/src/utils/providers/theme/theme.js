import React from 'react';

const ThemeContext = React.createContext();

class ThemeProvider extends React.Component {
  render() {
    const { theme, children } = this.props;

    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
  }
}

const ThemeConsumer = ThemeContext.Consumer;

const withTheme = WrappedComponent => props => (
  <ThemeConsumer>
    {theme => <WrappedComponent {...props} theme={theme} />}
  </ThemeConsumer>
);

export { ThemeProvider, ThemeConsumer, withTheme };
