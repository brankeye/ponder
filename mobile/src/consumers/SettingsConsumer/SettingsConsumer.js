import React from 'react';
import { Storage } from '@@utils';
import Expo from 'expo';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { omit } from 'ramda';

const Context = React.createContext();

class Provider extends React.Component {
  toggleTheme = () => {
    const { theme, updateTheme } = this.props;
    const nextTheme = theme === 'Dark' ? 'Light' : 'Dark';
    return updateSettings({
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
    return (
      <Context.Provider
        value={{
          ...this.props.settings,
          toggleTheme: this.toggleTheme,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

const defaultSettings = {
  timeZone: 'America/Toronto',
  theme: 'Dark',
};

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
      id
      theme
    }
  }
`;

const SettingsConsumer = Context.Consumer;
const SettingsProvider = withTheme(Provider);
export { SettingsProvider, SettingsConsumer };
