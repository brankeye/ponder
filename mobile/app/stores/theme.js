import { action, observable } from "mobx";
import config from "./config";
import { StyleSheet } from "react-native";
import { lightTheme, darkTheme, LIGHT_THEME, DARK_THEME } from "../constants/themes";
import PubSub from 'pubsub-js';

class theme {
  @observable appTheme = lightTheme;
  @observable currentTheme = LIGHT_THEME;
  @observable navBarStyle = lightNavBarStyle;

  @action applyLightTheme = () => {
    this.appTheme = lightTheme;
    this.currentTheme = LIGHT_THEME;
    this.navBarStyle = lightNavBarStyle;
    PubSub.publish('updateNavBar');
  };

  @action applyDarkTheme = () => {
    this.appTheme = darkTheme;
    this.currentTheme = DARK_THEME;
    this.navBarStyle = darkNavBarStyle;
    PubSub.publish('updateNavBar');
  }

  @action toggleTheme = () => {
    usingLightTheme = !usingLightTheme;
    if(usingLightTheme) {
      this.applyLightTheme();
    } else {
      this.applyDarkTheme();
    }
  }
}

const getNavBarStyle = (theme) => {
  return {
    navBarBackgroundColor: theme.navBarBackgroundColor,
    screenBackgroundColor: theme.pageBackgroundColor,
    navBarTextColor: theme.navBarTextColor
  }
}

const usingLightTheme = true;

const lightNavBarStyle = getNavBarStyle(lightTheme);
const darkNavBarStyle = getNavBarStyle(darkTheme);

const store = new theme();
export default store;
