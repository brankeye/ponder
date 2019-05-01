import * as React from 'react';
import { Button } from 'react-native-paper';
import { withTheme } from '@@utils/providers';

const Component = ({ theme, ...props }) => (
  <Button color={theme.textColor} {...props} />
);

export default withTheme(Component);
