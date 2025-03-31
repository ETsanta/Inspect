import React, { useState, useRef } from 'react';
import { View, Button, Image, Text } from 'react-native';
import Pictrue from '../../components/Pictrue';
import Drawer from "../../components/Drawer";
import Message from '../../components/Message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';


const Check = () => {
    return (
        <GestureHandlerRootView>
            <View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Progress.Bar
                        progress={0.5}
                        height={10}
                        width={200}
                        color="#1ba035"
                        borderRadius={5}>
                    </Progress.Bar>
                </View>

            </View>
        </GestureHandlerRootView>
    )
}

export default Check;