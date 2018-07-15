import React from 'react';
import Card from './Card';
import { ThemeConsumer } from '@@consumers';

export default props => (
  <ThemeConsumer>
    {({ theme: { underlayColor } }) => (
      <Card underlayColor={underlayColor} {...props} />
    )}
  </ThemeConsumer>
);
