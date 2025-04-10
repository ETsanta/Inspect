import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { List, Modal, TextInput, Dialog, Button, Card, SegmentedButtons } from 'react-native-paper';
import dayjs from 'dayjs';

const YearSwitchableCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const goToPreviousYear = () => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(newDate.getFullYear() - 1);
        setCurrentDate(newDate);
    };

    const goToNextYear = () => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(newDate.getFullYear() + 1);
        setCurrentDate(newDate);
    };

    const TaskList = [
        { title: '任务 1', id: "1111" },
        { title: '任务 2', id: "2" },
        { title: '任务 2', id: "23" },
        { title: '任务 2', id: "24" },
        { title: '任务 2', id: "25" },
        { title: '任务 2', id: "26" },
        { title: '任务 2', id: "27" },
        { title: '任务 2', id: "28" },
        { title: '任务 2', id: "29" },
        { title: '任务 2', id: "30" },
        { title: '任务 2', id: "31" },
        { title: '任务 2', id: "32" },
        { title: '任务 2', id: "33" },
        { title: '任务 2', id: "34" }
    ]
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        field1: '1',
        field2: '2',
        field3: '3',
        field4: '54',
        field5: '89',
    });
    const [tapTitle, setTapTitle] = useState('1');
    interface Field {
        field: keyof typeof formData; // 限制为 formData 的键类型
        title: string;
    }
    const fields: Field[] = [
        {
            field: "field1",
            title: "字段1"
        },
        {
            field: "field2",
            title: "字段2"
        },
        {
            field: "field3",
            title: "字段3"
        },
        {
            field: "field4",
            title: "字段4"
        },
        {
            field: "field5",
            title: "字段5"
        }
    ]
    function openDetail(id: string) {
        setIsModalVisible(true);
    }
    return (
        <View style={styles.container}>
            <View style={styles.yearSwitcher}>
                <TouchableOpacity onPress={goToPreviousYear}>
                    <Text style={styles.switchButton}>上一年</Text>
                </TouchableOpacity>
                <Text style={styles.yearText}>
                    {currentDate.getFullYear()} 年
                </Text>
                <TouchableOpacity onPress={goToNextYear}>
                    <Text style={styles.switchButton}>下一年</Text>
                </TouchableOpacity>
            </View>
            <Calendar
                current={currentDate.toISOString().split('T')[0]}
                hideExtraDays
                firstDay={1}
                key={currentDate.getFullYear()}
            />
            <SegmentedButtons style={{ flex: 0.1 }} value={tapTitle} density="high"
                onValueChange={setTapTitle} buttons={[
                    {
                        value: '1',
                        label: '点检',
                    },
                    {
                        value: '2',
                        label: '维修',
                    },
                    {
                        value: '3',
                        label: '自定义'
                    },
                ]}></SegmentedButtons>
            <Text style={{ flex: 0.1, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>{dayjs(currentDate).format('YYYY-MM-DD')}</Text>
            <ScrollView style={{ flex: 0.2 }}>
                {
                    TaskList.map((item, index) => (
                        <List.Item title={item.title} key={item.id}
                            onPress={() => openDetail(item.id)}
                            left={props => <List.Icon {...props} icon="floor-plan" />}
                            right={props => <List.Icon {...props} icon="chevron-right" />} />
                    ))
                }
            </ScrollView>
            <Dialog visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} >
                <Dialog.Title>任务信息</Dialog.Title>
                <Dialog.ScrollArea>
                    <ScrollView style={{ height: 300 }}>
                        {
                            fields.map((item, index) => (
                                <Card.Title
                                    key={index}
                                    title={item.title}
                                    subtitle={formData[item.field]}
                                />
                            ))
                        }

                    </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button onPress={() => setIsModalVisible(false)}>关闭</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    yearSwitcher: {
        flex: 0.12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    switchButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0184ce'
    },
    yearText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default YearSwitchableCalendar;    