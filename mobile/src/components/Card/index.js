import React from 'react';
import Card from './Card';
import { ThemeConsumer } from '@@utils/providers';

export default props => (
  <ThemeConsumer>
    {({ theme: { underlayColor } }) => (
      <Card underlayColor={underlayColor} {...props} />
    )}
  </ThemeConsumer>
);
