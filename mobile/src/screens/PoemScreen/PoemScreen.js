import React, { Component } from 'react';
import { Screen, PoemView } from '@@components';
import { Mutation } from 'react-apollo';
import { poemUpsertMutation } from '@@graphql';

class PoemScreen extends Component {
  render() {
    const poem = this.props.navigation.getParam('poem', null);
    return (
      <Mutation mutation={poemUpsertMutation}>
        {poemUpsert => {
          return (
            <Screen>
              <PoemView
                poem={poem}
                onLibraryChange={() => {
                  poemUpsert({
                    variables: {
                      input: {
                        id: poem.id,
                        inLibrary: !poem.inLibrary,
                      },
                    },
                  });
                  poem.inLibrary = !poem.inLibrary;
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
