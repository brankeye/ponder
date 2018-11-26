import React from 'react';
import Card from './Card';
import { SettingsConsumer } from '@@utils/providers';

export default props => (
  <SettingsConsumer>
    {({ theme: { underlayColor } }) => (
      <Card underlayColor={underlayColor} {...props} />
    )}
  </SettingsConsumer>
);
