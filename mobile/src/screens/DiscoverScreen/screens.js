import React from 'react';
import {
  Screen,
  PoemViewWithData,
  AuthorViewWithData,
  PoemLibraryQuery,
  Subscriber,
} from '@@components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class PoemListScreen extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', true);

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
  };

  handleSearch = term => {
    if (this.isActive()) {
      this.setState({ searchTerm: term });
    }
  };

  handleUpdate = (store, { data: { poem } }) => {
    try {
      const { poemList } = store.readQuery({
        query: PoemLibraryQuery,
      });
      if (poemList) {
        if (!poem.inLibrary) {
          poemList.edges = poemList.edges.filter(
            ({ node }) => node.id !== poem.id
          );
        } else {
          poemList.edges.unshift({ __typename: 'PoemEdge', node: poem });
        }
        store.writeQuery({
          query: PoemLibraryQuery,
          data: { poemList },
        });
      }
    } catch (err) {
      console.log('Err: ', err);
    }
  };

  render() {
    return (
      <Mutation mutation={PoemLibraryMutation} update={this.handleUpdate}>
        {updateLibrary => (
          <Screen>
            <Subscriber
              topic={'HomeHeader/onSearch'}
              handler={this.handleSearch}
            />
            <PoemViewWithData
              discover
              onChangeLibrary={({ id, inLibrary }) => {
                console.log({ id, inLibrary });
                updateLibrary({
                  variables: {
                    id,
                    inLibrary: !inLibrary,
                  },
                });
              }}
            />
          </Screen>
        )}
      </Mutation>
    );
  }
}

class AuthorListScreen extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', false);

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
  };

  handleSearch = term => {
    if (this.isActive()) {
      this.setState({ searchTerm: term });
    }
  };

  render() {
    return (
      <Screen>
        <Subscriber topic={'HomeHeader/onSearch'} handler={this.handleSearch} />
        <AuthorViewWithData discover onSelectPoem={this.handleSelect} />
      </Screen>
    );
  }
}

const PoemLibraryMutation = gql`
  mutation PoemUpsert($id: ID!, $inLibrary: Boolean!) {
    poem: poemLibrary(id: $id, inLibrary: $inLibrary) {
      id
      title
      teaser
      lines
      inLibrary
      author {
        id
        name
        inLibrary
      }
    }
  }
`;

export { PoemListScreen, AuthorListScreen };
