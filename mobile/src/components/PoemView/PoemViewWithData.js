import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PoemView from './PoemView';

class PoemViewWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { id, ...props } = this.props;
    return (
      <Query query={PoemQuery} variables={{ id }}>
        {({ loading, error, data: { poem } }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return <PoemView {...props} poem={poem} />;
        }}
      </Query>
    );
  }
}

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

export default PoemViewWithData;
