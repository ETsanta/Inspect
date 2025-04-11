import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Modal, Text, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Check from './Check';
import Maintain from './Maintain';
import Customize from './Customize';
import FAB from "./components/FAB"
import { Dialog, Portal, PaperProvider, TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeParse } from "../../untils/Handle"


const Head = createMaterialTopTabNavigator();
function checkIndex({ navigation }: { navigation: any }) {
    function getResult(result: any) {
        const code = "673834A7EF917EE2CFB6AC35C61D7790645F3DB701A9A0ED0E289D7A252788A8"
        code == result ? task(result) : handle(result);
    }
    const task = (result: string) => {
        const param = {
            id: 1,
            title: '今日任务1',
            content: {
                name: "log",
                type: "dom",
                time: "2025-06-12",
                manager: "csecar"
            }
        }
        setVisible(true);
        setDialogTitle("点检任务")
        setTaskInfo(param);
    }
    const handle = (result: string) => {
        setVisible(true);
        setResult(result);
        setDialogTitle("扫码结果")
    }
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState<any>();
    const [DialogTitle, setDialogTitle] = useState('扫码结果');
    const [TaskInfo, setTaskInfo] = useState<any>({
        id: "",
        title: "",
        content: {
            name: "",
            type: "",
            time: "",
            manager: ""
        },
        state: 1
    });

    const handleProblem = () => {
        setVisible(false)
        AsyncStorage.getItem('clear')
            .then(value => {
                let param = [...safeParse(value)]
                param.push(TaskInfo)
                AsyncStorage.setItem('localData', JSON.stringify(TaskInfo)).then(() => {
                    navigation.navigate('localData', { task: TaskInfo })
                    setVisible(false);
                }).catch(error => {
                    Alert.alert('任务本地化失败:', error);
                })
            })
            .catch(error => {
                let param = []
                param.push(TaskInfo)
                AsyncStorage.setItem('localData', JSON.stringify(TaskInfo)).then(() => {
                    navigation.navigate('check', { task: TaskInfo })
                    setVisible(false);
                }).catch(error => {
                    Alert.alert('任务本地化失败:', error);
                })
            });
        ;
    };
    const hideDialog = () => setVisible(false);

    return (
        <PaperProvider>
            <FAB scanResult={getResult} />
            <Head.Navigator initialRouteName="check">
                <Head.Screen key="check" name="check" options={{ title: '点检' }} component={Check} />
                <Head.Screen key="maintain" name="maintain" options={{ title: '维修' }} component={Maintain} />
                <Head.Screen key="customize" name="customize" options={{ title: '自定义' }} component={Customize} />
            </Head.Navigator>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>{DialogTitle}</Dialog.Title>
                    <Dialog.Content>
                        {DialogTitle === "点检任务" ? (
                            <>
                                <TextInput
                                    label="任务名称"
                                    value={TaskInfo.content.name}
                                    onChangeText={text => setTaskInfo((val: any) => ({
                                        ...val, content: {
                                            ...val.content,
                                            name: text
                                        }
                                    }))}
                                />
                                <TextInput
                                    label="任务类型"
                                    value={TaskInfo.content.type}
                                    onChangeText={text => setTaskInfo((val: any) => ({
                                        ...val, content: {
                                            ...val.content,
                                            type: text
                                        }
                                    }))}
                                />
                                <TextInput
                                    label="任务时间"
                                    value={TaskInfo.time}
                                    onChangeText={text => setTaskInfo((val: any) => ({
                                        ...val, content: {
                                            ...val.content,
                                            time: text
                                        }
                                    }))}
                                />
                                <TextInput
                                    label="任务负责人"
                                    value={TaskInfo.content.manager}
                                    onChangeText={text => setTaskInfo((val: any) => ({
                                        ...val, content: {
                                            ...val.content,
                                            manager: text
                                        }
                                    }))}
                                />
                            </>
                        ) : DialogTitle === "扫码结果" ? (
                            <Text>{result}</Text>
                        ) : null}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>关闭</Button>
                        {DialogTitle === "点检任务" ? <Button onPress={() => handleProblem()}>确定</Button> : ""}
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </PaperProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default checkIndex;