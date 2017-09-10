import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button } from '../../../app/components/presenters';
import { Text } from 'react-native-elements';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Button', module)
  .add('with text', () => (
    <Button title="Click me" onPress={action('clicked-text')} />
  ))
  .add('style override', () => (
    <Button
      title="Click me"
      onPress={action('clicked-text')}
      buttonStyle={{ backgroundColor: '#ff0000' }}
    />
  ));
