import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { View, Text } from '@@components/presenters';
import { PoemView } from '@@components/containers';
import { poemSaveMutation, poemListQuery } from '@@graphql';

class PoemPage extends Component {
  render() {
    const { poem } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PoemView poem={poem} onLibraryChange={() => {}} />
      </View>
    );
  }
}

export default PoemPage;

/*

class PoemPage extends Component {
  handleLibraryChange = upsert => () => {
    const { id, inLibrary } = this.props.poem;
    const input = {
      id,
      inLibrary: !inLibrary,
    };
    upsert({ variables: { input } });
  };

  handleUpdatePoemList = (cache, { data: { poemLibraryUpsert } }) => {
    const currentPoem = this.props.poem;
    const { poemList } = cache.readQuery({ query: poemListQuery });
    const poem = poemList.edges.find(({ node }) => node.id === currentPoem.id);
    poem.inLibrary = poemLibraryUpsert.inLibrary;
    poem.viewedAt = poemLibraryUpsert.viewedAt;
    cache.writeQuery({
      query: poemListQuery,
      data: { poemList },
    });
  };

  handleUpdatePoemLibrary = (cache, { data: { poemLibraryUpsert } }) => {
    const currentPoem = this.props.poem;
    const { poemList } = cache.readQuery({ query: poemListQuery });
    const poemEdge = poemList.edges.find(
      ({ node }) => node.id === currentPoem.id
    );
    if (poemEdge) {
      const poemLibrary = cache.readQuery({ query: poemListQuery }).poemList;
      const poemLibraryEdge = poemLibrary.edges.find(
        ({ node }) => node.id === currentPoem.id
      );
      if (poemLibraryEdge) {
        const index = poemLibrary.edges.indexOf(poemLibraryEdge);
        poemLibrary.edges[index] = poemEdge;
      } else {
        poemLibrary.edges.push(poemEdge);
      }
      cache.writeQuery({
        query: poemLibraryQuery,
        data: { poemList: poemLibrary },
      });
    }
  };

  handleUpdateCache = (...args) => {
    this.handleUpdatePoemList(...args);
    //this.handleUpdatePoemLibrary(...args);
  };

  render() {
    const { poem } = this.props;
    return (
      <Mutation
        mutation={poemLibraryUpsertMutation}
        update={this.handleUpdateCache}
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
                poem={poem}
                onLibraryChange={this.handleLibraryChange(upsert)}
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

*/
