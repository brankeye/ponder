import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class PoemCard extends React.Component {
  render() {
    return(
      <Card title='Hyperion by John Keats'>
        <Text>Sample</Text>
      </Card>
    );
  }
}

export default PoemCard;
