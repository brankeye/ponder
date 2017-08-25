import React, { Component } from 'react';

class Poem extends Component {
  render() {
    const poem = this.props.poem;
    return(
      <div>
        {poem.title} by {poem.author}
      </div>
    );
  }
}

export default Poem;