import React, { Component } from 'react';
import { View } from 'react-native';
import { Poem, Toggle } from 'components/presenters';
import { inject, observer } from 'mobx-react';

class PoemSection extends Component {
  state = {
    isFavorite: false
  };

  handleToggle = isActive => {
    if (isActive) {
      this.props.favorites.add(this.props.poem.id);
      this.setState({ isFavorite: true });
    } else {
      this.props.favorites.remove(this.props.poem.id);
      this.setState({ isFavorite: false });
    }
  };

  render() {
    return (
      <View>
        <Poem
          title={this.props.poem.title}
          author={this.props.poem.author}
          content={this.props.poem.teaser}
        />
        <Toggle
          isActive={this.state.isFavorite}
          activeText="Unfavorite"
          inactiveText="Favorite"
          onToggle={this.handleToggle}
        />
      </View>
    );
  }
}

export default inject('favorites')(observer(PoemSection));
