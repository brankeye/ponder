import React, { Component } from 'react';
import { View, Text } from 'react-native';

class PoemSection extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <Text style={this.props.textStyle}>{this.props.poem.title}</Text>
        <Text style={this.props.textStyle}>by {this.props.poem.author}</Text>
        <Text style={this.props.textStyle}>{this.props.poem.body}</Text>
      </View>
    );
  }
}

export default PoemSection;
