import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { List, Button } from "react-native-paper";


// 定义一个名为 Window 的 React 函数组件
const Window = () => {
    // 返回一个 JSX 结构，表示组件的渲染内容
    return (
        // 使用 <View> 组件作为容器，并应用样式 styles.container
        <View style={styles.container}>
            <Image style={styles.tinyLogo} source={require('../../asset/img/192.png')}></Image>
            <Text>匆匆转运</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

export default Window;