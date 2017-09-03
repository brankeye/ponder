import { action, observable } from "mobx";
import remotedev from "mobx-remotedev";
import config from "./config";
import { StyleSheet } from "react-native";
import { lightTheme, darkTheme } from "../themes/theme";
import PubSub from 'pubsub-js';

@remotedev(config)
class theme {
  @observable appStyle = lightStyle;
  @observable navBarStyle = lightNavBarStyle;

  @action applyLightTheme = () => {
    this.appStyle = lightStyle;
    this.navBarStyle = lightNavBarStyle;
    PubSub.publish('updateNavBar');
  };

  @action applyDarkTheme = () => {
    this.appStyle = darkStyle;
    this.navBarStyle = darkNavBarStyle;
    PubSub.publish('updateNavBar');
  }

  @action toggleTheme() {
    usingLightStyle = !usingLightStyle;
    if(usingLightStyle) {
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

const usingLightStyle = true;

const lightNavBarStyle = getNavBarStyle(lightTheme);
const darkNavBarStyle = getNavBarStyle(darkTheme);

const getStyle = (theme) => {
  return StyleSheet.create({
    pageBackgroundColor: {
      backgroundColor: theme.pageBackgroundColor
    },
    textColor: {
      color: theme.textColor
    }
  });
};

const lightStyle = getStyle(lightTheme);
const darkStyle = getStyle(darkTheme);

const store = new theme();
export default store;
