import React from 'react';
import { Storage } from '@@utils';
import Expo from 'expo';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const Context = React.createContext();

class Provider extends React.Component {
  static defaultProps = {
    settings: {
      theme: 'Dark',
    },
  };

  updateSettings = fn => {
    const { settings, update } = this.props;
    const newSettings = fn(settings);
    return update({
      variables: {
        ...settings,
        ...newSettings,
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
        <Mutation
          mutation={UserSettingsMutation}
          refetchQueries={() => ['User']}
        >
          {userSettings => (
            <WrappedComponent
              {...props}
              settings={user ? user.settings : defaultSettings}
              update={userSettings}
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
