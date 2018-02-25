import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from 'components/presenters';
import { PoemView } from 'components/containers';

class PoemPage extends Component {
  handleFavorite = isActive => {
    if (isActive) {
      this.props.poems.favoritePoem(this.props.poems.selectedPoem.id);
    } else {
      this.props.poems.unfavoritePoem(this.props.poems.selectedPoem.id);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PoemView
          poem={this.props.poems.selectedPoem}
          onFavorite={this.handleFavorite}
        />
      </View>
    );
  }
}

export default PoemPage;
