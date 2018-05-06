import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { View, Text } from '@@components/presenters';
import { PoemList } from '@@components/containers';

class PoemListPage extends Component {
  handleSelectPoem = poem => {
    this.props.navigation.navigate('Poem', { params: { poem } });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#EEEEEE',
        }}
      >
        <PoemList count={10} onSelectPoem={this.handleSelectPoem} />
      </View>
    );
  }
}

export default PoemListPage;
