import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { PoemList } from '@@components/containers';
import { poemListQuery } from '@@graphql';

class LandingPage extends Component {
  componentDidMount() {
    this.props.poems.fetchPoems();
  }

  handleSelectPoem = id => {
    this.props.poems.selectPoem(id);
    this.props.navigation.navigate('Poem');
  };

  render() {
    return (
      <Query query={poemListQuery} variables={{ first: 5 }}>
        {({ loading, error, data: { poemList } }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
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
                poems={poemList.edges.map(({ node }) => ({ ...node }))}
                onSelectPoem={this.handleSelectPoem}
              />
            </View>
          );
        }}
      </Query>
    );
  }
}

export default LandingPage;
