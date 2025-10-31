import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Easing } from 'react-native';

const Skeleton = ({ width, height, style }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Create a looping animation
    const animation = Animated.loop(
      Animated.sequence([
        // Animate from opacity 1 to 0.5
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        // Animate from opacity 0.5 back to 1
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start(); // Start the animation

    return () => {
      animation.stop(); // Stop the animation on unmount
    };
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height },
        style,
        { opacity: pulseAnim }, // Bind opacity to the animated value
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E1E9EE', // A light grey color for the skeleton
    borderRadius: 4,
  },
});

export default Skeleton;