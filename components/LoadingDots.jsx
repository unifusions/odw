import React, { useRef, useEffect, useContext } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';

const LoadingDots = ({ dotSize = 10 }) => {

  const { theme } = useContext(ThemeContext);

  const dotColor = theme.primary;
  const animatedValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.stagger(100,
        animatedValues.map(value =>
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ),
      ).start(() => startAnimation()); // Loop the animation
    };

    startAnimation();

    return () => {
      // Clean up the animations on unmount
      animatedValues.forEach(value => value.stopAnimation());
    };
  }, []);

  return (
    <View style={styles.container}>
      {animatedValues.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              backgroundColor: dotColor,
              opacity: value,
              transform: [
                {
                  scale: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 50,
    marginHorizontal: 5,
  },
});

export default LoadingDots;