import React from 'react';
import { ThemeConsumer } from '@@utils/providers';
import Color from 'color';

export const enhanceNavigatorWithTheme = Navigator => props => (
  <ThemeConsumer>
    {theme => <Navigator {...props} screenProps={{ theme }} />}
  </ThemeConsumer>
);

export const getTabBarOptions = theme => ({
  activeTintColor: theme.activeColor,
  inactiveTintColor: theme.inactiveColor,
  labelStyle: {
    color: theme.textColor,
    fontWeight: 'bold',
  },
  indicatorStyle: {
    backgroundColor: theme.accentColor,
  },
  style: {
    backgroundColor: Color(theme.backgroundColor)
      .darken(0.05)
      .string(),
  },
});
