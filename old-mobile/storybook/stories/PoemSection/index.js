import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PoemSection } from '../../../app/components/presenters';
import { Text } from 'react-native-elements';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('PoemSection', module).add('with text', () => <PoemSection />);
