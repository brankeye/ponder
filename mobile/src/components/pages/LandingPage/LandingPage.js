import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { PoemList } from '@@components/containers';

class LandingPage extends Component {
  handleSelectPoem = id => {
    this.props.poems.selectPoem(id);
    this.props.navigation.navigate('Poem');
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

export default LandingPage;
