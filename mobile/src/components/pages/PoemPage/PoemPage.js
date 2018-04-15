import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { PoemView } from '@@components/containers';

class PoemPage extends Component {
  handleFavorite = () => {
    this.props.poems.changeFavoritePoem(this.props.poems.selectedPoem.id);
  };

  render() {
    const { poems: { loading, selectedPoem } } = this.props;
    return (
      <View
        hide={loading}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <PoemView poem={selectedPoem} onFavorite={this.handleFavorite} />
      </View>
    );
  }
}

export default PoemPage;
