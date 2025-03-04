import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Easing, t  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const MovingBackground = ({children}) => {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  // 白色区域位置插值
  const whitePosition = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-100%', '50%'] // 横向移动范围
  });

  return (
    <View style={styles.container}>
      <AnimatedGradient
        colors={['rgba(34, 150, 243,1)', '#FFFFFF', 'rgba(34, 150, 243,1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={[
          styles.gradient,
          {
            transform: [{ translateX: whitePosition }]
          }
        ]}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3', 
    overflow: 'hidden',
    width: '100%', 
    height: '100%',
    borderRadius: 5, 
    marginBottom:5,
  },
  gradient: {
    width: '200%', // 超出一倍宽度实现平滑过渡
    height: '100%',
    opacity: 0.5
  },
  TitleSlot:{
    position: 'absolute',
    top: 10,
    left: 10,
  }
});

export default MovingBackground;