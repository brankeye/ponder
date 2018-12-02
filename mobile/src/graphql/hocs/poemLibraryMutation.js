import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import mutation from '../mutations/poemUpdateLibrary';
import poemLibraryQuery from '../queries/poemLibrary';
import { PoemFragment, AuthorFragment } from '../fragments';
import { Buffer } from 'buffer';

export default graphql(mutation, {
  alias: 'withPoemLibraryMutation',
  props: ({ mutate }) => ({
    updateLibrary: poem =>
      mutate({
        variables: { id: poem.id, inLibrary: poem.inLibrary },
        optimisticResponse: {
          __typename: 'Mutation',
          poem,
        },
        update: (store, { data: { poem } }) => {
          try {
            const data = store.readQuery({ query: poemLibraryQuery });
            if (poem.inLibrary) {
              const startCursor = Buffer.from(poem.inLibraryAt).toString(
                'base64'
              );
              const nextPoem = {
                __typename: 'PoemEdge',
                node: poem,
                cursor: startCursor,
              };
              data.poemList.edges.unshift(nextPoem);
              data.poemList.pageInfo.startCursor = startCursor;
            } else {
              console.log('Removing: ', poem);
              console.log('Edges: ', data.poemList.edges.map(x => x.node.id));
              data.poemList.edges = data.poemList.edges.filter(
                x => x.node.id !== poem.id
              );
              if (data.poemList.edges.length > 0) {
                data.poemList.pageInfo.startCursor =
                  data.poemList.edges[0].cursor;
              }
              console.log('Next: ', data.poemList.edges.map(x => x.node.id));
            }
            store.writeQuery({ query: poemLibraryQuery, data });
          } catch (error) {
            //console.log('Error: ', error);
          }

          const poemFragmentResult = store.readFragment({
            id: poem.id,
            fragment: gql(PoemFragment),
          });
          console.log('Poem fragment: ', poemFragmentResult);
          if (poemFragmentResult) {
            poemFragmentResult.inLibrary = poem.inLibrary;
            poemFragmentResult.inLibraryAt = poem.inLibraryAt;
            store.writeFragment({
              id: poem.id,
              fragment: gql(PoemFragment),
              data: poemFragmentResult,
            });
          }

          const authorFragmentResult = store.readFragment({
            id: poem.id,
            fragment: gql(AuthorFragment),
          });
          console.log('Author fragment: ', authorFragmentResult);
          if (authorFragmentResult) {
            authorFragmentResult.inLibrary = poem.author.inLibrary;
            authorFragmentResult.inLibraryAt = poem.author.inLibraryAt;
            store.writeFragment({
              id: poem.author.id,
              fragment: gql(AuthorFragment),
              data: authorFragmentResult,
            });
          }
        },
      }),
    partialRefetch: true,
  }),
});
