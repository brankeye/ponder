import React, { Component } from 'react';
import '../styles/App.css';
import PoemList from './PoemList';

class App extends Component {

  state = {
    poems: [
      {
        title: 'Ode to a Nightingale',
        author: 'John Keats',
        year: '1819'
      },
      {
        title: 'Ode to a Grecian Urn',
        author: 'John Keats',
        year: '1819'
      },
      {
        title: 'Ode to Psyche',
        author: 'John Keats',
        year: '1819'
      }
    ]
  };

  render() {
    return (
      <PoemList poems={this.state.poems} />
    );
  }
}

export default App;
