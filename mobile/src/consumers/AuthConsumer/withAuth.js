import React from 'react';
import { AuthConsumer } from './index';

export const withAuth = WrappedComponent => props => (
  <AuthConsumer>
    {authProps => <WrappedComponent {...props} auth={authProps} />}
  </AuthConsumer>
);
