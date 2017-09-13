import { action, observable } from "mobx";
import config from "./config";
import { StyleSheet } from "react-native";
import { lightTheme, darkTheme } from "../constants/themes";
import PubSub from 'pubsub-js';

class theme {
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

const usingLightTheme = true;

const lightNavBarStyle = getNavBarStyle(lightTheme);
const darkNavBarStyle = getNavBarStyle(darkTheme);

const store = new theme();
export default store;
