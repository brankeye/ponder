import React from 'react';

const { Provider, Consumer } = React.createContext();

class StateProvider extends React.Component {
  state = this.props.state || {};

  handleGetState = key => this.state[key] || {};

  handleSetState = key => (input, callback) => {
    this.setState(
      {
        ...this.state,
        [key]: {
          ...this.state[key],
          ...input,
        },
      },
      callback
    );
  };

  render() {
    return (
      <Provider
        value={{
          state: this.handleGetState,
          setState: this.handleSetState,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const StateConsumer = ({ stateKey, children }) => (
  <Consumer>
    {({ state, setState }) =>
      children({
        stateKey,
        state: state(stateKey),
        setState: setState(stateKey),
      })
    }
  </Consumer>
);

StateConsumer.defaultProps = {
  stateKey: 'default',
};

export { StateProvider, StateConsumer };
