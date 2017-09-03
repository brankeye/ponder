import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { inject, observer } from 'mobx-react';

const composer = WrappedComponent => {
  @inject('theme')
  @observer
  class Page extends Component {
    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(
        this.onNavigatorEvent
      );
    }

    onNavigatorEvent = (event) => {
      switch (event.id) {
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
      this.props.navigator.setStyle(this.props.theme.navBarStyle);
    };

    render() {
      return <WrappedComponent {...this.props} appStyle={this.props.theme.appStyle} />;
    }
  }

  return Page;
};

export default composer;
