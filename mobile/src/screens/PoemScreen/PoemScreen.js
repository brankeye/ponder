import React, { Component } from 'react';
import { Screen, PoemViewWithData, PoemListQuery } from '@@components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class PoemScreen extends Component {
  render() {
    const id = this.props.navigation.getParam('id', null);
    return (
      <Mutation
        mutation={PoemUpsertMutation}
        update={(store, { data: { poemUpsert: poem } }) => {
          try {
            const { poemList } = store.readQuery({
              query: PoemListQuery,
              variables: {
                from: 'Library',
              },
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
                query: PoemListQuery,
                variables: {
                  from: 'Library',
                },
                data: { poemList },
              });
            }
          } catch (err) {
            console.log('Err: ', err);
          }
        }}
      >
        {(poemUpsert, { client }) => {
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

const PoemUpsertMutation = gql`
  mutation PoemUpsert($input: PoemInput!) {
    poemUpsert(input: $input) {
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

export default PoemScreen;
