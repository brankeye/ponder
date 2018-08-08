import React, { Component } from 'react';
import { Screen, PoemViewWithData } from '@@components';
import { Mutation } from 'react-apollo';
import { poemUpsertMutation, poemListQuery } from '@@graphql';

class PoemScreen extends Component {
  refetchQueries = types =>
    types.map(type => ({
      query: poemListQuery,
    }));

  render() {
    const id = this.props.navigation.getParam('id', null);
    return (
      <Mutation
        mutation={poemUpsertMutation}
        refetchQueries={this.refetchQueries(['Default', 'Recents', 'Library'])}
      >
        {poemUpsert => {
          return (
            <Screen>
              <PoemViewWithData
                id={id}
                onChangeLibrary={({ inLibrary }) => {
                  poemUpsert({
                    variables: {
                      input: {
                        id,
                        inLibrary: !inLibrary,
                      },
                    },
                  });
                }}
              />
            </Screen>
          );
        }}
      </Mutation>
    );
  }
}

export default PoemScreen;
