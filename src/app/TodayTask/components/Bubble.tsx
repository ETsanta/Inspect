import React, { useRef, useEffect } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    StyleSheet,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BUBBLE_SIZE = 60;
const EDGE_MARGIN = 80;

const DraggableBubble = () => {
    const insets = useSafeAreaInsets();
    const pan = useRef(new Animated.ValueXY()).current;

    // 计算实际可用区域
    const safeArea = {
        top: insets.top,
        bottom: insets.bottom,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - insets.top - insets.bottom,
    };

    // 初始化位置（右下角）
    useEffect(() => {
        const initialPosition = {
            x: SCREEN_WIDTH - BUBBLE_SIZE ,
            y: safeArea.height  - BUBBLE_SIZE - EDGE_MARGIN,
        };
        pan.setValue(initialPosition);
    }, []);

    // 精准边缘吸附逻辑
    const snapToEdge = (x: number, y: number) => {
        // 有效区域边界
        const boundaries = {
            left: EDGE_MARGIN,
            right: SCREEN_WIDTH - BUBBLE_SIZE - EDGE_MARGIN,
            top: EDGE_MARGIN + safeArea.top,
            bottom: safeArea.height + safeArea.top - BUBBLE_SIZE - EDGE_MARGIN,
        };

        // 计算各边距
        const distances = {
            left: x,
            right: boundaries.right - x,
            top: y - boundaries.top,
            bottom: boundaries.bottom - y,
        };

        // 确定最近水平边
        let targetX = x;
        if (distances.left < distances.right) {
            targetX = boundaries.left;
        } else {
            targetX = boundaries.right;
        }

        // 确定最近垂直边（仅当接近边缘时吸附）
        let targetY = y;
        const verticalThreshold = safeArea.height * 0.15;
        if (y - boundaries.top < verticalThreshold) {
            targetY = boundaries.top;
        } else if (boundaries.bottom - y < verticalThreshold) {
            targetY = boundaries.bottom;
        }

        Animated.spring(pan, {
            toValue: { x: targetX, y: targetY },
            friction: 7,
            useNativeDriver: false,
        }).start();
    };

    // 高精度拖拽处理
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.extractOffset(); // 关键：分离偏移量
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset(); // 关键：合并偏移量
                const currentX = pan.x._value;
                const currentY = pan.y._value;
                snapToEdge(currentX, currentY);
            },
            onPanResponderTerminate: () => {
                pan.flattenOffset();
            },
        })
    ).current;

    // 实时边界约束
    const interpolatedPosition = {
        x: pan.x.interpolate({
            inputRange: [-BUBBLE_SIZE, SCREEN_WIDTH],
            outputRange: [-BUBBLE_SIZE, SCREEN_WIDTH],
            extrapolate: 'clamp',
        }),
        y: pan.y.interpolate({
            inputRange: [-BUBBLE_SIZE, SCREEN_HEIGHT],
            outputRange: [-BUBBLE_SIZE, SCREEN_HEIGHT],
            extrapolate: 'clamp',
        }),
    };

    return (
        <Animated.View
            style={[
                styles.bubble,
                {
                    ...styles.BubbleIcon,
                    transform: [
                        { translateX: interpolatedPosition.x },
                        { translateY: interpolatedPosition.y },
                    ],
                },
            ]}
            {...panResponder.panHandlers}
        >
            <Icon name="fit-screen" size={35} color="#FFF" />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    bubble: {
        position: 'absolute',
        width: BUBBLE_SIZE,
        height: BUBBLE_SIZE,
        zIndex: 100,
        borderRadius: BUBBLE_SIZE / 2,
        backgroundColor: '#2196F3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    BubbleIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default DraggableBubble;