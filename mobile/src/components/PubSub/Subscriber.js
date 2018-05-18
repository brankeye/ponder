import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Subscriber extends Component {
  static defaultProps = {
    handler: () => {},
  };

  state = {
    data: this.props.init || undefined,
    token: PubSub.subscribe(this.props.topic, (msg, data) =>
      this.props.handler(data)
    ),
  };

  componentWillUnmount() {
    PubSub.unsubscribe(this.state.token);
  }

  render() {
    return null;
  }
}

export default Subscriber;
