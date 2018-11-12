import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PoemView from './PoemView';

class PoemViewWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  async componentDidMount() {
    this.props.viewPoem({
      variables: { id: this.props.poem.id },
    });
  }

  render() {
    return <PoemView {...this.props} />;
  }
}

const enhance = WrappedComponent => ({ id, discover, ...props }) => (
  <Mutation mutation={PoemViewMutation}>
    {viewPoem => (
      <Query
        query={discover ? PoemDiscoverQuery : PoemQuery}
        variables={!discover ? { id } : null}
      >
        {({ loading, error, refetch, data: { poem } }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <WrappedComponent {...props} poem={poem} viewPoem={viewPoem} />
          );
        }}
      </Query>
    )}
  </Mutation>
);

export const PoemQuery = gql`
  query Poem($id: ID!) {
    poem(id: $id) {
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

export const PoemDiscoverQuery = gql`
  query PoemDiscover {
    poem: poemDiscover {
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

export const PoemViewMutation = gql`
  mutation PoemView($id: ID!) {
    poem: poemView(id: $id) {
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

export default enhance(PoemViewWithData);
