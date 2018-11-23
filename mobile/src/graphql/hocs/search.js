import React from 'react';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { withPoemRecentsQuery } from '@@graphql';
import { Screen, PoemList, Subscriber, Loading } from '@@components';

const withSearch = topic =>
  compose(
    withState('search', 'updateSearch', ''),
    withHandlers({
      isActive: props => () => props.navigation.getParam('isActive', false),
    }),
    Component => props => (
      <React.Fragment>
        <Subscriber
          topic={topic}
          handler={search => {
            if (props.isActive()) {
              props.updateSearch(search);
            }
          }}
        />
        <Component {...props} />
      </React.Fragment>
    )
  );

export default withSearch;
