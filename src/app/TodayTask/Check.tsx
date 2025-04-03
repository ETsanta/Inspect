import React, { useState, useRef } from 'react';
import { View, Button, Image, Text } from 'react-native';
import Pictrue from '../../components/Pictrue';
import Drawer from "../../components/Drawer";
import Message from '../../components/Message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { List, TextInput, ProgressBar, MD3Colors } from 'react-native-paper';

const Data = [
    {
        id: 1,
        title: '今日任务1',
        content: {
            field1: "内容1",
            field2: "内容2",
            field3: "内容3",
        },
        state: 0,
    },
    {
        id: 2,
        title: '今日任务2',
        content: {
            field1: "内容4",
            field2: "内容5",
            field3: "内容6",
        },
        state: 1,
    }
]
function Check() {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    return (
        <GestureHandlerRootView>
            <View style={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Text>点检进度：</Text>
                <Progress.Bar width={300} useNativeDriver={true} progress={0.3}  />
            </View>

            <List.Section title="今日任务列表">
                {Data.map((item, index) => (
                    <List.Accordion
                        title={item.title}
                        key={item.id}
                        id={item.id}
                        left={props => <List.Icon {...props} icon="format-list-checks" color={item.state === 0 ? "#e94242" : "#239342"} />}>
                        <TextInput
                            label="字段1"
                            editable={false}
                            value={item.content.field1}
                        />
                        <TextInput
                            label="字段2"
                            editable={false}
                            value={item.content.field2}
                        />
                        <TextInput
                            label="字段3"
                            editable={false}
                            value={item.content.field3}
                        />
                    </List.Accordion>
                ))}

            </List.Section>
        </GestureHandlerRootView>
    );
}

export default Check;