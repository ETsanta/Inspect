import React, { useState, useRef } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bubble from "./components/Bubble"
import Check from './Check';
import Maintain from './Maintain';
import Customize from './Customize';

const Head = createMaterialTopTabNavigator();

function checkIndex() {
    return (
        <View style={{ flex: 1 }}>
            <Bubble />
            <Head.Navigator initialRouteName="Check">
                <Head.Screen name="Check" options={{ title: '点检' }} component={Check} />
                <Head.Screen name="Maintain" options={{ title: '维修' }} component={Maintain} />
                <Head.Screen name="Customize" options={{ title: '自定义' }} component={Customize} />
            </Head.Navigator>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default checkIndex;