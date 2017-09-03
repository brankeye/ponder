import { action, observable } from "mobx";
import remotedev from "mobx-remotedev";
import config from "./config";
import { StyleSheet } from "react-native";
import { lightTheme, darkTheme } from "../themes/theme";
import PubSub from 'pubsub-js';

@remotedev(config)
class styles {
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
    navBarTextColor: theme.navBarTextColor
  }
}

const usingLightStyle = true;

const lightNavBarStyle = getNavBarStyle(lightTheme);
const darkNavBarStyle = getNavBarStyle(darkTheme);

const getStyle = (theme) => {
  return StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.pageBackgroundColor
    },
    textStyle: {
      color: theme.textColor
    },
    navItemStyle: {
      padding: 20
    }
  });
};

const lightStyle = getStyle(lightTheme);
const darkStyle = getStyle(darkTheme);

const store = new styles();
export default store;
