import React, { useState, useRef } from 'react';
import { View, Button, Image, StyleSheet, Modal, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bubble from "./components/Bubble"
import Check from './Check';
import Maintain from './Maintain';
import Customize from './Customize';
import FAB from "./components/FAB"
import { Dialog } from 'react-native-paper';


const Head = createMaterialTopTabNavigator();

function checkIndex() {
    function getResult(result: any) {
        setVisible(true);
        console.log(result);
        
        setResult(result);
    }
    const [visible, setVisible] = useState(true);
    const [result, setResult] = useState<any>();
    const hideDialog = () => setVisible(false);
    return (
        <GestureHandlerRootView>
            {/* <Modal visible={visible} onDismiss={hideDialog}>
                <Text>{result}</Text>
            </Modal> */}
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>This is a title</Dialog.Title>
                <Dialog.Content>
                    <Text>This is simple dialog</Text>
                </Dialog.Content>
            </Dialog>
            <Text>{result}</Text>
            <FAB scanResult={getResult} />
            <Head.Navigator initialRouteName="check" screenOptions={({ route, navigation }) => {
                console.log('Current route:', route.name);
                return {};
            }}>
                <Head.Screen key="check" name="check" options={{ title: '点检' }} component={Check} />
                <Head.Screen key="maintain" name="maintain" options={{ title: '维修' }} component={Maintain} />
                <Head.Screen key="customize" name="customize" options={{ title: '自定义' }} component={Customize} />
            </Head.Navigator>
        </GestureHandlerRootView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default checkIndex;