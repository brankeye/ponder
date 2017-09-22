import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { inject, observer } from 'mobx-react';

const composePage = WrappedComponent => {
  class Page extends Component {
    constructor(props) {
      super(props);
      this.token = PubSub.subscribe('updateNavBar', this.updateNavBar);
      props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentWillUnmount() {
      PubSub.unsubscribe(this.token);
    }

    onNavigatorEvent = event => {
      switch (event.id) {
        case 'willAppear':
          this.updateNavBar();
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
          onNavigatorEvent={this.onNavigatorEvent}
          appTheme={this.props.theme.appTheme}
        />
      );
    }
  }

  return inject('theme', 'navigation')(observer(Page));
};

export default composePage;
