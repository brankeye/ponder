import React, { Component } from 'react';
import PropTypes from 'prop-types';

const composer = ComponentToWrap => {
  return class ThemeComponent extends Component {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      theme: PropTypes.object.isRequired
    };

    render() {
      const { theme } = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `theme` prop, like a hook
      return <ComponentToWrap {...this.props} theme={theme} />;
    }
  };
};

export default composer;
