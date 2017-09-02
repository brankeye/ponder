import React, { Component } from 'react';
import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';
import theme from '../../themes/theme';

export default class Provider extends Component {
  render() {
    const { store, children } = this.props;
    return (
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StoreProvider>
    );
  }
}
