import React, { useState, useRef } from 'react';
import { View, Button, Image, Text } from 'react-native';
import Pictrue from '../../components/Pictrue';
import Drawer from "../../components/Drawer";
import Message from '../../components/Message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';


function maintain() {
    return (
        <GestureHandlerRootView>
            <Text>maintain</Text>
        </GestureHandlerRootView>
    );
}

export default maintain;