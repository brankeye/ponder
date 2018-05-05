import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { PoemView } from '@@components/containers';
import { poemLibraryUpsertMutation, poemListQuery } from '@@graphql';

class PoemPage extends Component {
  handleLibraryChange = upsert => () => {
    const { id, inLibrary } = this.props.poems.selectedPoem;
    const input = {
      poemId: id,
      inLibrary: !inLibrary,
      viewedAt: new Date().getTime(),
    };
    console.log({ input });
    upsert({ variables: { input } });
  };

  render() {
    const {
      poems: { loading, selectedPoem },
    } = this.props;
    return (
      <Mutation
        mutation={poemLibraryUpsertMutation}
        update={cache => {
          const { poemList } = cache.readQuery({ query: poemListQuery });
          const poem = poemList.find(x => x.id === selectedPoem.id);
          poem.inLibrary = !poem.inLibrary;
          poem.viewedAt = new Date().getTime();
          cache.writeQuery({
            query: poemListQuery,
            data: { poemList },
          });
        }}
      >
        {upsert => {
          return (
            <View
              hide={loading}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PoemView
                poem={selectedPoem}
                onLibraryChange={this.handleLibraryChange(upsert)}
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

export default PoemPage;
