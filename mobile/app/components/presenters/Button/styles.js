import stylizer from 'utilities/Stylizer';
const Stylizer = new stylizer();

export const getDynamicStyles = theme =>
  Stylizer.getDynamicStyles(dynamicStylesCreator, theme);

const dynamicStylesCreator = theme => ({
  textStyle: {
    color: theme.textColor
  }
});
