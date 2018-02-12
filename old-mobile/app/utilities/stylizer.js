import { StyleSheet } from 'react-native';

class Stylizer {
  styles = {};
  identifier = '';

  getDynamicStyles = (creator, theme) => {
    if (this.identifier !== theme.identifier) {
      this.identifier = theme.identifier;
      this.styles = this.create(creator(theme));
    }
    return this.styles;
  };

  create = sheet => StyleSheet.create(sheet);
}

const makeStylizer = () => new Stylizer();

export default makeStylizer;
