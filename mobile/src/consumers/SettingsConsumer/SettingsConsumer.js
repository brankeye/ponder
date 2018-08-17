import React from 'react';
import { Storage } from '@@utils';
import Expo from 'expo';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { omit } from 'ramda';

const Context = React.createContext();

class Provider extends React.Component {
  updateSettings = fn => {
    const { settings, updateSettings } = this.props;
    const input = typeof fn === 'function' ? fn(settings) : fn;
    return updateSettings({
      variables: {
        input,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        userSettings: {
          __typename: 'User',
          settings: {
            __typename: 'UserSettings',
            ...settings,
            ...input,
          },
        },
      },
      update: (proxy, { data: { userSettings } }) => {
        const data = proxy.readQuery({ query: UserQuery });
        data.user.settings = userSettings.settings;
        proxy.writeQuery({ query: UserQuery, data });
      },
    });
  };

  toggleTheme = () =>
    this.updateSettings(({ theme }) => ({
      theme: theme === 'Dark' ? 'Light' : 'Dark',
    }));

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
  pushToken: null,
  timeZone: null,
  notify: false,
  notifyTime: null,
  theme: 'Dark',
};

const withUser = WrappedComponent => props => (
  <Query query={UserQuery}>
    {({ loading, data: { user } }) =>
      loading ? null : (
        <Mutation mutation={UserSettingsMutation}>
          {userSettings => (
            <WrappedComponent
              {...props}
              settings={
                user ? omit(['__typename'], user.settings) : defaultSettings
              }
              updateSettings={userSettings}
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
      settings {
        pushToken
        timeZone
        notify
        notifyTime
        theme
      }
    }
  }
`;

export const UserSettingsMutation = gql`
  mutation UserSettings($input: UserSettingsInput!) {
    userSettings(input: $input) {
      settings {
        pushToken
        timeZone
        notify
        notifyTime
        theme
      }
    }
  }
`;

const SettingsConsumer = Context.Consumer;
const SettingsProvider = withUser(Provider);
export { SettingsProvider, SettingsConsumer };
