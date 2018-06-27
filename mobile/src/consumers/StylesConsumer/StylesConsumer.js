import React from 'react';
import { StyleSheet } from 'react-native';

const { Provider, Consumer } = React.createContext();

class StylesProvider extends React.Component {
  static defaultProps = {
    context: {},
  };

  render() {
    return (
      <Provider
        value={{
          context: this.props.context,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

class StylesConsumer extends React.Component {
  static defaultProps = {
    styles: () => {},
  };

  render() {
    return (
      <Consumer>
        {({ context }) =>
          this.props.children(StyleSheet.create(this.props.styles(context)))
        }
      </Consumer>
    );
  }
}

export { StylesProvider, StylesConsumer };
