import React, { Component } from 'react';
import { View } from 'react-native';
import { Poem, Toggle } from 'components/presenters';
import { inject, observer } from 'mobx-react/native';

class PoemSection extends Component {
  state = {
    isFavorite: false
  };

  componentDidMount() {
    const id = this.props.poem.id;
    const isFavorite = this.props.favorites.isFavorite(id);
    console.log('Fav: ', {
      id,
      isFavorite
    });
    this.setState({ isFavorite });
  }

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
      <View style={{ flex: 1 }}>
        <Poem
          title={this.props.poem.title}
          author={this.props.poem.authorName}
          content={this.props.poem.content}
        />
        <View style={{ padding: 30 }}>
          <Toggle
            isActive={this.state.isFavorite}
            activeText="Unfavorite"
            inactiveText="Favorite"
            onToggle={this.handleToggle}
          />
        </View>
      </View>
    );
  }
}

export default inject('favorites')(observer(PoemSection));
