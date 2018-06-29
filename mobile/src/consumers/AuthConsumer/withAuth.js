import React from 'react';
import { AuthConsumer } from './index';

export const withAuth = WrappedComponent => props => (
  <AuthConsumer>
    {args => <WrappedComponent {...props} {...args} />}
  </AuthConsumer>
);
