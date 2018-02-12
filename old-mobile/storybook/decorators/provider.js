import React from 'react';
import { Provider } from 'mobx-react/native';
import store from '../../app/stores';

const decorator = story => {
  return <Provider {...store}>{story()}</Provider>;
};

export default decorator;
