import React, { useState, useRef } from 'react';
import { View, Button, Image, Text } from 'react-native';
import Pictrue from '../../components/Pictrue';
import Drawer from "../../components/Drawer"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Check = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, zIndex: 1 }}>
                <Pictrue></Pictrue>
                <Drawer></Drawer>
            </View>
        </GestureHandlerRootView>
    )
}

export default Check;