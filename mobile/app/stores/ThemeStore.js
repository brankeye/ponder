import { action, observable } from "mobx";
import { StyleSheet } from "react-native";
import { lightTheme, darkTheme } from "../constants/themes";
import PubSub from 'pubsub-js';
import remotedev from 'mobx-remotedev';

@remotedev({ name: 'Themes' })
class ThemeStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable appTheme = lightTheme;
  @observable navBarStyle = lightNavBarStyle;

  @action applyLightTheme = () => {
    this.appTheme = lightTheme;
    this.navBarStyle = lightNavBarStyle;
    PubSub.publish('updateNavBar');
  };

  @action applyDarkTheme = () => {
    this.appTheme = darkTheme;
    this.navBarStyle = darkNavBarStyle;
    PubSub.publish('updateNavBar');
  }

  @action toggleTheme = () => {
    usingLightTheme = !usingLightTheme;
    usingLightTheme ? this.applyLightTheme() : this.applyDarkTheme();
  }
}

const getNavBarStyle = (theme) => {
  return {
    navBarBackgroundColor: theme.navBarBackgroundColor,
    screenBackgroundColor: theme.pageBackgroundColor,
    navBarTextColor: theme.navBarTextColor
  }
}

let usingLightTheme = true;

const lightNavBarStyle = getNavBarStyle(lightTheme);
const darkNavBarStyle = getNavBarStyle(darkTheme);

export default ThemeStore;
