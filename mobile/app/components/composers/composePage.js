import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { inject, observer } from 'mobx-react';

const composePage = WrappedComponent => {
  class Page extends Component {
    constructor(props) {
      super(props);
      props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
      switch (event.id) {
        case 'willAppear':
          this.token = PubSub.subscribe('updateNavBar', this.updateNavBar);
          this.updateNavBar();
          break;
        case 'didDisappear':
          PubSub.unsubscribe(this.token);
          break;
      }
    };

    updateNavBar = () => {
      this.props.navigator.setStyle(this.props.theme.navBarStyle);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          appStyle={this.props.theme.appStyle}
        />
      );
    }
  }

  return inject('theme')(observer(Page));
};

export default composePage;
