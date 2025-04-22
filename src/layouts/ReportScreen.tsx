import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const { height } = Dimensions.get('window');

export default function SecondScreen() {
    const [formData, setFormData]: any = useState({ field1: '', field2: '', field3: '', field4: '', field5: '', field6: '' })

    const fields = [
        {
            title: "字段1",
            field: 'field1',
        },
        {
            title: "字段2",
            field: 'field2',
        },
        {
            title: "字段3",
            field: 'field3',
        },
        {
            title: "字段4",
            field: 'field4',
        },
        {
            title: "字段5",
            field: 'field5',
        },
        {
            title: "字段6",
            field: 'field6',
        },
        {
            title: "字段6",
            field: 'field6',
        },
    ];

    return (
        <View style={styles.container}>
            <Appbar.Header mode="center-aligned"><Appbar.Content title="问题汇报" /></Appbar.Header>
            <ScrollView style={styles.listContainer} >
                {
                    fields.map((item, index) => (
                        <TextInput key={index} label={item.title} value={formData[item.field]} onChangeText={(text) => setFormData({ ...formData, [item.field]: text })} />
                    ))
                }
            </ScrollView >

            <View style={styles.buttonContainer}>
                < Button icon="clipboard-text-outline" mode="contained" onPress={() => console.log('Pressed')}>
                    提交
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flex: 0.9,
        margin: 10,
    },
    userTitle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 40,
        fontSize: 16
    },
    buttonContainer: {
        flex: 0.1,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
    },
});

