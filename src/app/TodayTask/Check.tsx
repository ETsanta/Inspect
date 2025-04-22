import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Image, Text, Alert } from 'react-native';
import Pictrue from '../../components/Pictrue';
import Drawer from "../../components/Drawer";
import Message from '../../components/Message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { List, TextInput, ProgressBar, MD3Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeParse } from "../../untils/Handle"

interface localData {
    id: string,
    title: string,
    content: {
        name: string,
        type: string,
        time: string,
        manager: string
    },
    state: 0 | 1 // 0 未完成，1 已完成
}
function Check({ appParam, onUpdateParam }: { appParam: any, onUpdateParam: (paramValue: any) => void }) {
    let [routeData, setRouteData] = useState();
    let [ListData, setListData] = React.useState<localData[]>([]);

    useEffect(() => {
        if (appParam) {
            setRouteData(appParam);
            getDataForLocal();
        }
    }, [appParam]);

    function getDataForLocal() {
        AsyncStorage.getItem('localData')
            .then(value => {
                setListData(safeParse(value, []));
            })
            .catch(error => {
                console.error('Error loading data:', error);
            });
    }
    return (
        <GestureHandlerRootView>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Text>点检进度：</Text>
                <Progress.Bar useNativeDriver={true} progress={0.8} />
            </View>
            <List.Section title="今日任务列表">
                {ListData.map((item, index) => (
                    <List.Accordion
                        title={item.title}
                        key={item.id}
                        id={item.id}
                        left={props => <List.Icon {...props} icon="format-list-checks" color={item.state === 0 ? "#e94242" : "#239342"} />}>
                        <TextInput
                            label="字段1"
                            editable={false}
                            value={item.content.name}
                        />
                        <TextInput
                            label="字段2"
                            editable={false}
                            value={item.content.type}
                        />
                        <TextInput
                            label="字段3"
                            editable={false}
                            value={item.content.time}
                        />
                        <TextInput
                            label="字段3"
                            editable={false}
                            value={item.content.manager}
                        />
                    </List.Accordion>
                ))}

            </List.Section>
        </GestureHandlerRootView>
    );
}

export default Check;