import React from 'react';
import { TouchableWithoutFeedback, Animated, Easing } from 'react-native';

class TouchableHighlight extends React.Component {
  animatedValue = new Animated.Value(0);

  handlePressIn = () => {
    Animated.timing(this.animatedValue, {
      toValue: 300,
      duration: this.props.duration,
      easing: Easing.in(Easing.ease),
    }).start();

    const { onPressIn } = this.props;
    if (onPressIn) onPressIn();
  };

  handlePressOut = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: this.props.duration,
      easing: Easing.in(Easing.ease),
    }).start();

    const { onPressOut } = this.props;
    if (onPressOut) onPressOut();
  };

  render() {
    const {
      underlayColor,
      children,
      useNativeDriver,
      style,
      ...props
    } = this.props;
    var backgroundColor = this.animatedValue.interpolate({
      inputRange: [0, 300],
      outputRange: ['transparent', underlayColor],
      useNativeDriver: useNativeDriver,
    });
    return (
      <TouchableWithoutFeedback
        {...props}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[style, { backgroundColor, flex: 1 }]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

TouchableHighlight.defaultProps = {
  underlayColor: '#FFFFFF22',
  duration: 200,
  useNativeDriver: true,
};

export default TouchableHighlight;
