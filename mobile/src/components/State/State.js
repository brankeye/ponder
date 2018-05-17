import React, { Component } from 'react';

class State extends React.Component {
  state = this.props.state || {};

  render() {
    return this.props.children({
      state: this.state,
      setState: state => this.setState(state),
    });
  }
}

export default State;
