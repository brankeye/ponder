import React from 'react';

const { Provider, Consumer } = React.createContext();

class PropsProvider extends React.Component {
  store = {};

  handleGetProps = key => this.store[key] || {};

  handleSetProps = key => props => {
    this.store[key] = props;
  };

  render() {
    return (
      <Provider
        value={{
          getProps: this.handleGetProps,
          setProps: this.handleSetProps,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const PropsConsumer = ({ name, children, sender, receiver, ...props }) => (
  <Consumer>
    {({ getProps, setProps }) => {
      if (!children) {
        setProps(name)(props);
        return null;
      }
      return children({
        name,
        ...getProps(name),
      });
    }}
  </Consumer>
);

PropsConsumer.defaultProps = {
  name: 'default',
};

export { PropsProvider, PropsConsumer };
