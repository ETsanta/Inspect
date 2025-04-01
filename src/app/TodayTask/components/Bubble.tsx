import React, { useRef, useEffect, useState } from 'react';
import { View, PanResponder, Animated, Dimensions, StyleSheet } from 'react-native';

const BUBBLE_SIZE = 60;
const EDGE_THRESHOLD = 30;

const DraggableBubble = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const pan = useRef(new Animated.ValueXY()).current;

  // 监听屏幕变化
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      // 屏幕旋转时重置位置
      pan.setValue({
        x: Math.min(pan.x._value, window.width - BUBBLE_SIZE),
        y: Math.min(pan.y._value, window.height - BUBBLE_SIZE)
      });
    });
    return () => subscription?.remove();
  }, []);

  // 初始化位置
  useEffect(() => {
    pan.setValue({
      x: dimensions.width - BUBBLE_SIZE,
      y: dimensions.height/2 - BUBBLE_SIZE/2
    });
  }, [dimensions]);

  const snapToEdge = (x, y) => {
    /* 前述优化后的吸附逻辑 */
  };

  const panResponder = PanResponder.create({
    /* 前述优化后的配置 */
  });

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          left: 0, // 关键修复
          top: 0
        }
      ]}
      {...panResponder.panHandlers}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE/2,
    backgroundColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  }
});

export default DraggableBubble;