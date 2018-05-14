import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { poemQuery } from '@@graphql';
import PoemView from './PoemView';

class PoemViewWithData extends Component {
  static defaultProps = {
    onEndReachedThreshold: 0.5,
  };

  render() {
    const { id, ...props } = this.props;
    return (
      <Query query={poemQuery} variables={{ id }}>
        {({ loading, error, data: { poem } }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return <PoemView {...props} poem={poem} />;
        }}
      </Query>
    );
  }
}

export default PoemViewWithData;
