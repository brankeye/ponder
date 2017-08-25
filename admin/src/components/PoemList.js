import React, { Component } from 'react';
import Poem from './Poem';

class Poems extends Component {
  render() {
    const allPoems = this.props.poems.map((poem, index) => (
      <Poem key={index} poem={poem} />
    ));

    return (<div>{allPoems}</div>);
  }
}

export default Poems;