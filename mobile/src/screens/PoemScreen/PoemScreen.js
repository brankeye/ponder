import React, { Component } from 'react';
import {
  Screen,
  PoemViewWithData,
  PoemListQuery,
  AuthorListQuery,
} from '@@components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class PoemScreen extends Component {
  render() {
    const id = this.props.navigation.getParam('id', null);
    return (
      <Mutation mutation={PoemUpsertMutation}>
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
                    awaitRefetchQueries: true,
                    refetchQueries: () => ['poemList', 'authorList'],
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
