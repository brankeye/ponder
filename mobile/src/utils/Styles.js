import React from 'react';
import { StyleSheet } from 'react-native';

const { Provider, Consumer } = React.createContext();

class StylesProvider extends React.Component {
  static defaultProps = {
    id: 'default',
    context: {},
  };

  render() {
    return (
      <Provider
        value={{
          id: this.props.id,
          context: this.props.context,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

class Factory {
  id = '';
  styles = {};

  getStyles = (creator, id, context) => {
    if (this.id !== id) {
      this.id = id;
      const result = typeof creator === 'function' ? creator(context) : creator;
      this.styles = this.create(result);
    }
    return this.styles;
  };

  create = sheet => StyleSheet.create(sheet);
}

class Styles {
  consumer = styles => {
    const factory = new Factory();
    return ({ children }) => (
      <Consumer>
        {({ id, context }) => children(factory.getStyles(styles, id, context))}
      </Consumer>
    );
  };

  hoc = styles => WrappedComponent => {
    const StylesConsumer = this.consumer(styles);
    return props => (
      <StylesConsumer>
        {styles => <WrappedComponent {...props} styles={styles} />}
      </StylesConsumer>
    );
  };
}

export default new Styles();
export { StylesProvider };
