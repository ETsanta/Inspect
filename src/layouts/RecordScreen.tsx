import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { List, Modal, TextInput, Dialog, Button } from 'react-native-paper';
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
        { title: 'Task 1', id: "1111" },
        { title: 'Task 2', id: "2D电影" },
    ]
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        field1: '1',
        field2: '2',
        field3: '3',
        field4: '54',
        field5: '89',
    });
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
            {
                TaskList.map((item, index) => (
                    <List.Item title={item.title} key={item.id}
                        onPress={() => openDetail(item.id)}
                        left={props => <List.Icon {...props} icon="floor-plan" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />} />
                ))
            }
            <Dialog visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} >
                <Dialog.Title>任务信息</Dialog.Title>
                <Dialog.ScrollArea>
                    <ScrollView style={{ height: 300 }}>
                        <TextInput label="字段1" value={formData.field1} />
                        <TextInput label="字段2" value={formData.field2} />
                        <TextInput label="字段3" value={formData.field3} />
                        <TextInput label="字段4" value={formData.field4} />
                        <TextInput label="字段5" value={formData.field5} />
                        <TextInput label="字段5" value={formData.field5} />
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
        padding: 20,
        backgroundColor: '#fff'
    },
    yearSwitcher: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
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