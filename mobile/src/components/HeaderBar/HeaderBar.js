import React from 'react';
import { Toolbar } from 'react-native-material-ui';
import { StateConsumer } from '@@consumers';

const HeaderBar = ({
  stateKey,
  navigation,
  title,
  searchable,
  onLeftElementPress,
  ...props
}) => (
  <StateConsumer stateKey={stateKey}>
    {({ state, setState }) => (
      <Toolbar
        {...props}
        leftElement="menu"
        centerElement={title}
        searchable={
          searchable
            ? {
                autoFocus: true,
                placeholder: 'Search',
                onChangeText: searchText => {
                  setState({ searchText });
                },
                onSubmitEditing: () => {
                  const { searchText } = state;
                  setState({ searchRequested: true });
                },
              }
            : undefined
        }
        onLeftElementPress={() => {
          navigation.toggleDrawer();
          if (onLeftElementPress) onLeftElementPress();
        }}
      />
    )}
  </StateConsumer>
);

HeaderBar.defaultProps = {
  searchable: false,
};

export default HeaderBar;
