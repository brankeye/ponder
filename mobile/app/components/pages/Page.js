import React, { Component, Children } from 'react';
import PubSub from 'pubsub-js';
import { inject, observer } from 'mobx-react';

@inject('styles')
@observer
class Page extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
        this.token = PubSub.subscribe('updateNavBar', this.updateNavBar);
        this.updateNavBar();
        break;
      case 'didDisappear':
        PubSub.unsubscribe(this.token);
        break;
    }
  }

  updateNavBar = () => {
    this.props.navigator.setStyle(this.props.styles.navBarStyle);
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default Page;
