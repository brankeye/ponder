import React from 'react';
import Color from 'color';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const SettingsContext = React.createContext();

class Provider extends React.Component {
  toggleTheme = () => {
    const {
      settings: { theme, compactView },
      updateSettings,
    } = this.props;
    const nextTheme = theme === 'Dark' ? 'Light' : 'Dark';
    return updateSettings({
      variables: {
        settings: {
          theme: nextTheme,
          compactView,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        user: {
          __typename: 'User',
          settings: {
            __typename: 'Settings',
            theme: nextTheme,
            compactView,
          },
        },
      },
    });
  };

  render() {
    const { settings, children } = this.props;
    const nextTheme = settings.theme === 'Light' ? lightTheme : darkTheme;
    return (
      <SettingsContext.Provider
        value={{
          theme: nextTheme,
          compactView: settings.compactView,
          toggleTheme: this.toggleTheme,
        }}
      >
        <PaperProvider theme={getTheme(nextTheme)}>{children}</PaperProvider>
      </SettingsContext.Provider>
    );
  }
}

const enhance = WrappedComponent => props => (
  <Query query={UserQuery}>
    {({ loading, data: { user } }) =>
      loading ? null : (
        <Mutation mutation={SettingsUpdateMutation}>
          {updateSettings => (
            <WrappedComponent
              {...props}
              settings={user.settings}
              updateSettings={updateSettings}
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
      settings {
        theme
        compactView
      }
    }
  }
`;

export const SettingsUpdateMutation = gql`
  mutation SettingsUpdate($settings: SettingsInput!) {
    user: settingsUpdate(settings: $settings) {
      settings {
        theme
        compactView
      }
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

const SettingsProvider = enhance(Provider);
const SettingsConsumer = SettingsContext.Consumer;

const withSettings = WrappedComponent => props => (
  <SettingsConsumer>
    {themeProps => <WrappedComponent {...props} {...themeProps} />}
  </SettingsConsumer>
);

export { SettingsProvider, SettingsConsumer, withSettings };