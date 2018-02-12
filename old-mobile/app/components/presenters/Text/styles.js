import makeStylizer from 'utilities/stylizer';
const Stylizer = makeStylizer();

export const getDynamicStyles = theme =>
  Stylizer.getDynamicStyles(dynamicStylesCreator, theme);

const dynamicStylesCreator = theme => ({
  style: {
    color: theme.textColor
  }
});
