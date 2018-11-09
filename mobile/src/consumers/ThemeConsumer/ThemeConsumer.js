import React from 'react';
import { lightTheme, darkTheme } from '@@constants';
import Color from 'color';
import { ThemeProvider as MaterialThemeProvider } from 'react-native-material-ui';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const ThemeContext = React.createContext();

class Provider extends React.Component {
  toggleTheme = () => {
    const { theme, updateTheme } = this.props;
    const nextTheme = theme === 'Dark' ? 'Light' : 'Dark';
    return updateTheme({
      variables: {
        theme: nextTheme,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        user: {
          __typename: 'User',
          theme: nextTheme,
        },
      },
      update: (proxy, { data: { user } }) => {
        const data = proxy.readQuery({ query: UserQuery });
        data.user.theme = user.theme;
        console.log('User: ', JSON.stringify(data, null, 2));
        proxy.writeQuery({ query: UserQuery, data });
      },
    });
  };

  render() {
    const { theme, updateTheme, children } = this.props;
    const nextTheme = theme === 'Light' ? lightTheme : darkTheme;
    return (
      <ThemeContext.Provider
        value={{
          theme: nextTheme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <MaterialThemeProvider uiTheme={getTheme(nextTheme)}>
          {children}
        </MaterialThemeProvider>
      </ThemeContext.Provider>
    );
  }
}

const withTheme = WrappedComponent => props => (
  <Query query={UserQuery}>
    {({ loading, data: { user } }) =>
      loading ? null : (
        <Mutation mutation={ThemeUpdateMutation}>
          {updateTheme => (
            <WrappedComponent
              {...props}
              theme={user.theme}
              updateTheme={updateTheme}
            />
          )}
        </Mutation>
      )
    }
  </Query>
);

export const UserQuery = gql`
  query User {
    user {
      id
      theme
    }
  }
`;

export const ThemeUpdateMutation = gql`
  mutation ThemeUpdate($theme: ThemeType!) {
    user: themeUpdate(theme: $theme) {
      theme
    }
  }
`;

const getTheme = theme => ({
  palette: {
    primaryColor: theme.backgroundColor,
    primaryTextColor: Color(theme.textColor)
      .alpha(0.87)
      .toString(),
    secondaryTextColor: Color(theme.textColor)
      .alpha(0.54)
      .toString(),
    activeIcon: Color(theme.primaryColor)
      .alpha(0.87)
      .toString(),
    inactiveIcon: Color(theme.primaryColor)
      .alpha(0.54)
      .toString(),
    canvasColor: theme.backgroundColor,
  },
  toolbar: {
    container: {
      height: 50,
    },
    titleText: {
      color: theme.textColor,
    },
    rightElement: {
      color: theme.textColor,
    },
    leftElement: {
      color: theme.textColor,
    },
  },
  toolbarSearchActive: {
    rightElement: {
      color: theme.textColor,
    },
    leftElement: {
      color: theme.textColor,
    },
  },
});

const ThemeProvider = withTheme(Provider);
const ThemeConsumer = ThemeContext.Consumer;

export { ThemeProvider, ThemeConsumer };
