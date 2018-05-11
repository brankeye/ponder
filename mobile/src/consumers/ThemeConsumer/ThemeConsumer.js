import React from 'react';
import { Query } from 'react-apollo';
import { themeQuery } from '@@graphql';
import { lightTheme, darkTheme } from '@@constants';

const ThemeConsumer = ({ children, ...props }) => (
  <Query {...props} query={themeQuery}>
    {({ data: { theme }, client }) => {
      const nextTheme = theme.type === 'light' ? darkTheme : lightTheme;
      return children({
        theme,
        toggleTheme: () =>
          client.writeData({
            data: { theme: { __typename: 'Theme', ...nextTheme } },
          }),
      });
    }}
  </Query>
);

export default ThemeConsumer;
