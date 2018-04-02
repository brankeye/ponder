import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { PoemView } from '@@components/containers';

class PoemPage extends Component {
  componentDidMount() {
    this.props.poems.fetchSelectedPoem();
  }

  handleFavorite = () => {
    this.props.poems.changeFavoritePoem(this.props.poems.selectedPoem.id);
  };

  render() {
    return (
      <View
        hide={!this.props.poems.selectedPoem.lines}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <PoemView
          poem={this.props.poems.selectedPoem}
          onFavorite={this.handleFavorite}
        />
      </View>
    );
  }
}

export default PoemPage;
