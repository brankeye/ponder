import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import { inject, observer } from 'mobx-react/native';
import pages from 'constants/screens';

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

    handleCloseDrawer = () => {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true,
        to: 'closed'
      });
    };

    onNavigatorEvent = event => {
      switch (event.id) {
        case 'willAppear':
          this.updateNavBar();
          break;
      }

      if (event.type == 'DeepLink') {
        const parts = event.link.split('/'); // Link parts
        const payload = event.payload; // (optional) The payload
        console.log(payload);
        if (parts[0] === 'drawer') {
          this.props.navigator.resetTo(payload);
          this.handleCloseDrawer();
        } else if (parts[0] === 'modal') {
          this.props.navigator.push(payload);
          this.handleCloseDrawer();
        }
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

  return inject('theme')(observer(Page));
};

export default composePage;
