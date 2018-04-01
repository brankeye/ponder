import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { PoemList } from '@@components/containers';
import client, { user } from '@@graphql';

class LandingPage extends Component {
  async componentDidMount() {
    const { data } = await client.query({ query: user });
    console.log('Got data: ', JSON.stringify(data, null, 2));
  }

  handleSelectPoem = async id => {
    await this.props.poems.selectPoem(id);
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
        <PoemList
          poems={this.props.poems.list}
          onSelectPoem={this.handleSelectPoem}
        />
      </View>
    );
  }
}

export default LandingPage;
