import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Publisher extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      PubSub.publish(this.props.topic, nextProps.data);
    }
  }

  render() {
    return null;
  }
}

export default Publisher;
