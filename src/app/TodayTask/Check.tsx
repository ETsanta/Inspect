import React, { useState, useRef } from 'react';
import { View, Button, Image, Text } from 'react-native';
import Pictrue from '../../components/Pictrue';
import Drawer from "../../components/Drawer"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Check = () => {
    return (
        <GestureHandlerRootView>
            <View>
                <Pictrue height={150} width={150} ></Pictrue>
            </View>
        </GestureHandlerRootView>
    )
}

export default Check;