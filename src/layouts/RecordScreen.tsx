import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { List, Modal, TextInput, Dialog, Button, Card, SegmentedButtons } from 'react-native-paper';
import dayjs from 'dayjs';
import SinglePick from "../components/SinglePick";

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

    let [TaskList, setTaskList] = useState<any[]>([])
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
        field: keyof typeof formData;
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
    const toggleParam =
        [
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
        ]
    function getDateData() {
        setTaskList([
            { title: '点检 1', id: "11" },
            { title: '点检 2', id: "21" },
            { title: '点检 2', id: "23" },
            { title: '点检 2', id: "24" },
            { title: '点检 2', id: "25" },
            { title: '点检 2', id: "26" },
            { title: '点检 2', id: "27" }
        ])
    }
    useEffect(() => {
        //初始化数据
        getDateData()
    }, [])
    function openDetail(id: string) {
        setIsModalVisible(true);
    }
    function pickChange(val: string) {
        setTapTitle(val)
        switch (val) {
            case '1':
                setTaskList([
                    { title: '点检 1', id: "1" },
                    { title: '点检 2', id: "2" },
                    { title: '点检 2', id: "23" },
                    { title: '点检 2', id: "24" },
                    { title: '点检 2', id: "25" },
                    { title: '点检 2', id: "26" },
                    { title: '点检 2', id: "27" },
                ])
                break;
            case '2':
                setTaskList([
                    { title: '维修 1', id: "1" },
                    { title: '维修 2', id: "2" },
                    { title: '维修 2', id: "23" },
                    { title: '维修 2', id: "24" },
                    { title: '维修 2', id: "25" },
                    { title: '维修 2', id: "26" },
                    { title: '维修 2', id: "27" },
                ])
                break;
            case '3':
                setTaskList([
                    { title: '自定义 1', id: "1" },
                    { title: '自定义 2', id: "2" },
                    { title: '自定义 2', id: "23" },
                    { title: '自定义 2', id: "24" },
                    { title: '自定义 2', id: "25" },
                    { title: '自定义 2', id: "26" },
                    { title: '自定义 2', id: "27" },
                ])
                break;
            default:
                break;
        }

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
                onDayPress={day => {
                    setCurrentDate(new Date(day.dateString));
                }}
                markedDates={{
                    [currentDate.toISOString().split('T')[0]]: { selected: true, disableTouchEvent: true, selectedColor: '#58b96b' }
                }}
                key={currentDate.getFullYear()}
            />
            <Text style={{ flex: 0.1, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>{dayjs(currentDate).format('YYYY-MM-DD')}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <SinglePick defaultValue={tapTitle} selectedColor="#018ed3"
                    onChange={pickChange} options={toggleParam}></SinglePick>
            </View>
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
            <Dialog visible={isModalVisible} onDismiss={() => setIsModalVisible(false)}>
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