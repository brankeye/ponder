import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text } from '../../../app/components/presenters';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Text', module).add('with text', () => <Text>Sample text!</Text>);
