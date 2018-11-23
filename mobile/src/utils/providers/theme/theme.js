import React from 'react';
import Color from 'color';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

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
    const { theme, children } = this.props;
    const nextTheme = theme === 'Light' ? lightTheme : darkTheme;
    return (
      <ThemeContext.Provider
        value={{
          theme: nextTheme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <PaperProvider theme={getTheme(nextTheme)}>{children}</PaperProvider>
      </ThemeContext.Provider>
    );
  }
}

const enhance = WrappedComponent => props => (
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

export const lightTheme = {
  type: 'light',
  primaryColor: '#FFFFFF',
  accentColor: '#607D8B',
  textColor: '#404040',
  backgroundColor: '#e6e6e6',
  underlayColor: '#00000011',
};

export const darkTheme = {
  type: 'dark',
  primaryColor: '#000000',
  accentColor: '#607D8B',
  textColor: '#F3F3F3',
  backgroundColor: '#404040',
  underlayColor: '#FFFFFF11',
};

const getTheme = theme => {
  const Theme = theme.type === 'light' ? DefaultTheme : DarkTheme;
  return {
    ...Theme,
    roundness: 0,
    colors: {
      ...Theme.colors,
      primary: Color(theme.backgroundColor)
        .darken(0.05)
        .string(),
      accent: theme.accentColor,
    },
  };
};

const ThemeProvider = enhance(Provider);
const ThemeConsumer = ThemeContext.Consumer;

const withTheme = WrappedComponent => props => (
  <ThemeConsumer>
    {themeProps => <WrappedComponent {...props} {...themeProps} />}
  </ThemeConsumer>
);

export { ThemeProvider, ThemeConsumer, withTheme };
