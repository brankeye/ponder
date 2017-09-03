import { action, observable } from "mobx";
import remotedev from "mobx-remotedev";
import config from "./config";
import { StyleSheet } from "react-native";
import { lightTheme, darkTheme } from "../themes/theme";

@remotedev(config)
class styles {
  @observable current = lightStyle;
  @observable navBarStyle = lightNavBarStyle;

  @action applyLightTheme = () => {
    this.current = lightStyle;
    this.navBarStyle = lightNavBarStyle;
  };

  @action applyDarkTheme = () => {
    this.current = darkStyle;
    this.navBarStyle = darkNavBarStyle;
  }
}

const getNavBarStyle = (theme) => {
  return {
    navBarBackgroundColor: theme.navBarBackgroundColor,
    navBarTextColor: theme.navBarTextColor
  }
}

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
    poemSectionStyle: {
      color: theme.textColor
    }
  });
};

const lightStyle = getStyle(lightTheme);
const darkStyle = getStyle(darkTheme);

const store = new styles();
export default store;
