import React from 'react';
import { Storage } from '@@utils';
import Expo from 'expo';

const { Provider, Consumer } = React.createContext();

class SettingsProvider extends React.Component {
  state = {
    settings: {
      themeType: 'dark',
      animationsEnabled: true,
    },
  };

  async componentDidMount() {
    const settings = await Storage.getItem('settings');
    if (settings) {
      this.setState({ settings });
    } else {
      await this.saveSettings();
    }
  }

  async componentWillUnmount() {
    await this.saveSettings();
  }

  saveSettings = async () => {
    const { settings } = this.state;
    await Storage.setItem('settings', settings);
  };

  toggleTheme = () => {
    const settings = { ...this.state.settings };
    if (settings.themeType === 'light') {
      settings.themeType = 'dark';
    } else {
      settings.themeType = 'light';
    }
    this.setState({ settings }, () => this.saveSettings());
  };

  toggleAnimations = () => {
    const settings = { ...this.state.settings };
    settings.animationsEnabled = !settings.animationsEnabled;
    this.setState({ settings }, () => this.saveSettings());
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state.settings,
          toggleAnimations: this.toggleAnimations,
          toggleTheme: this.toggleTheme,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const SettingsConsumer = Consumer;
export { SettingsProvider, SettingsConsumer };
